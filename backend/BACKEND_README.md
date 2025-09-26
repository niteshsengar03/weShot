# WeShot Backend - Express.js API Server

![Backend Badge](https://img.shields.io/badge/Backend-Express.js%20%2B%20TypeScript-green?style=for-the-badge)
![Database Badge](https://img.shields.io/badge/Database-MySQL%20%2B%20Prisma-blue?style=for-the-badge)
![Queue Badge](https://img.shields.io/badge/Queue-Redis%20%2B%20BullMQ-red?style=for-the-badge)

## 🎯 Overview

The WeShot backend is a robust Express.js API server built with TypeScript that handles student registration, placement data processing, and automated email notifications. It features a clean architecture with proper separation of concerns, comprehensive error handling, and scalable queue-based email processing.

## 🛠️ Architecture

The backend follows a layered architecture pattern:

```
┌─────────────────────────────────┐
│        API Routes (Express.js)       │
├─────────────────────────────────┤
│         Middleware Layer            │
│    (Validation, CORS, Logging)     │
├─────────────────────────────────┤
│         Controller Layer           │
│      (Request/Response Handling)    │
├─────────────────────────────────┤
│         Service Layer              │
│       (Business Logic)             │
├─────────────────────────────────┤
│       Repository Layer            │
│       (Database Access)            │
├─────────────────────────────────┤
│         Database Layer             │
│      (MySQL + Prisma ORM)         │
└─────────────────────────────────┘

      ┌─────────────────────────────────┐
      │        Queue System              │
      │   (Redis + BullMQ + Workers)   │
      └─────────────────────────────────┘
```

## 📁 Project Structure

```
src/
├── config/                  # Configuration files
│   ├── index.ts             # Main server configuration
│   ├── logger.config.ts     # Winston logging setup
│   ├── mailer.config.ts     # Nodemailer configuration
│   └── redis.config.ts      # Redis connection setup
│
├── controllers/             # Request handlers
│   ├── student.controllers.ts
│   ├── import.controllers.ts
│   └── ping.controllers.ts
│
├── DTO/                     # Data Transfer Objects
│   ├── student.dto.ts
│   └── notification.dto.ts
│
├── middlewares/             # Express middlewares
│   ├── correlation.middleware.ts
│   └── error.middleware.ts
│
├── prisma/                  # Database layer
│   ├── client.ts            # Prisma client instance
│   └── schema.prisma        # Database schema
│
├── producer/                # Queue job producers
│   └── email.producer.ts
│
├── processor/               # Queue job processors
│   └── email.processor.ts
│
├── queue/                   # Queue configurations
│   └── mailer.queue.ts
│
├── repositories/            # Database access layer
│   └── student.repository.ts
│
├── routers/                 # API route definitions
│   └── v1/
│       ├── index.router.ts
│       ├── student.router.ts
│       └── ping.router.ts
│
├── service/                 # Business logic layer
│   ├── student.service.ts
│   ├── scrapStudents.service.ts
│   └── mailer.service.ts
│
├── templates/               # Email template handlers
│   └── templates.handler.ts
│
├── types/                   # TypeScript definitions
│   └── express.d.ts
│
├── utils/                   # Utility functions
│   └── errors/
│       └── app.error.ts
│
├── validator/               # Input validation schemas
│   ├── index.ts
│   ├── student.validator.ts
│   └── ping.validator.ts
│
├── server.ts               # Application entry point
└── Example.json           # Sample API request data
```

## 🚀 Getting Started

### Prerequisites

Before setting up the backend, ensure you have the following installed:

- **Node.js 18+**
- **MySQL 8.0+**
- **Redis 6.0+**
- **Gmail account** (for SMTP email sending)

### 🔧 Installation & Setup

#### 1. Install Dependencies

```bash
cd backend
npm install
```

#### 2. Environment Configuration

Create a `.env` file in the backend root directory:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/weshot_db"

# Server Configuration
PORT=3001

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Gmail SMTP Configuration
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
```

#### 3. Database Setup

**Create MySQL Database:**
```sql
CREATE DATABASE weshot_db;
```

**Generate Prisma Client:**
```bash
npx prisma generate
```

**Run Database Migrations:**
```bash
npx prisma db push
```

**Optional - View Database with Prisma Studio:**
```bash
npx prisma studio
```

#### 4. Redis Setup

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**macOS (with Homebrew):**
```bash
brew install redis
brew services start redis
```

**Verify Redis is running:**
```bash
redis-cli ping
# Should return: PONG
```

#### 5. Gmail App Password Setup

1. **Enable 2FA** on your Gmail account
2. Go to **Google Account Settings** → **Security**
3. Under "How you sign in to Google," select **2-Step Verification**
4. At the bottom, select **App passwords**
5. Generate an app password for "Mail"
6. Use this password in your `.env` file

#### 6. Start the Development Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## 📋 API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### 🔍 Health Check Endpoint

#### GET `/`
Health check endpoint to verify server status.

**Response:**
```json
{
  "message": "Server is running"
}
```

### 🎓 Student Management

#### POST `/student/create-student`
Register a new student in the system.

**Request Body:**
```json
{
  "regNo": "22BLC1234",
  "name": "John Doe",
  "email": "john.doe@vitchennai.ac.in"
}
```

**Validation Rules:**
- `regNo`: String, 9-10 characters, unique
- `name`: String, required
- `email`: Valid email format, required

**Success Response (201):**
```json
{
  "message": {
    "id": 1,
    "regNo": "22BLC1234",
    "name": "John Doe",
    "email": "john.doe@vitchennai.ac.in",
    "created_at": "2025-09-25T10:30:00.000Z",
    "updated_at": "2025-09-25T10:30:00.000Z"
  }
}
```

**Error Response (409 - Conflict):**
```json
{
  "error": "User Already exists"
}
```

**Error Response (400 - Validation Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "regNo",
      "message": "Username too short"
    }
  ]
}
```

### 📨 Notification System

#### POST `/student/n8n`
Process placement notifications for registered students. This endpoint is designed to be used by external automation systems like n8n.

**Request Body:**
```json
[
  {
    "reg": "22BLC1234",
    "name": "John Doe",
    "email": "john.doe@vitchennai.ac.in",
    "subject": "Shortlisted for Google Interview"
  },
  {
    "email": "jane.smith@vitchennai.ac.in",
    "name": "Jane Smith",
    "subject": "Microsoft Technical Round Scheduled"
  }
]
```

**Processing Logic:**
1. For each entry, the system first tries to match by `reg` (registration number)
2. If no `reg` is provided, it falls back to matching by `email`
3. Only matched students (existing in database) will receive notifications
4. Emails are queued for asynchronous processing

**Success Response (200):**
```json
{
  "result": [
    {
      "reg": "22BLC1234",
      "name": "John Doe",
      "email": "john.doe@vitchennai.ac.in",
      "subject": "Shortlisted for Google Interview"
    }
  ]
}
```

## 🔄 Queue System

The backend uses **Redis + BullMQ** for reliable email processing:

### Queue Flow
```
API Request → Email Producer → Redis Queue → Email Processor → Gmail SMTP
```

### Email Processing Features
- **Asynchronous Processing**: Emails don't block API responses
- **Retry Logic**: Failed emails are automatically retried
- **Template System**: Uses Handlebars for dynamic email content
- **Monitoring**: Queue status and job completion logging

### Email Templates

Templates are stored in `src/templates/mailer/` as `.hbs` files:

**hello.hbs** (default template):
```handlebars
<h1>Hi {{name}}!</h1>
<p>Registration Number: {{reg}}</p>
<p>{{subject}}</p>
<p>This is an automated notification from WeShot.</p>
```

## 🗃️ Database Schema

### Students Table
```sql
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regNo` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `students_regNo_key` (`regNo`)
);
```

**Fields:**
- `id`: Auto-increment primary key
- `regNo`: Unique registration number (9-10 characters)
- `name`: Student's full name
- `email`: Student's email address
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

## 🔎 Logging & Monitoring

### Winston Logger Configuration
- **Console Logs**: Development environment
- **File Logs**: Production environment with daily rotation
- **Log Levels**: Error, Warn, Info, Debug
- **Correlation IDs**: Track requests across services

### Log Locations
```
logs/
├── application-%DATE%.log    # General application logs
├── error-%DATE%.log          # Error logs only
└── combined-%DATE%.log       # All logs combined
```

## ⚡ Performance Features

- **Connection Pooling**: Prisma handles database connection pooling
- **Redis Caching**: Session and queue data caching
- **Async Processing**: Non-blocking email operations
- **Input Validation**: Early request validation to prevent unnecessary processing
- **Error Boundaries**: Proper error isolation and handling

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Failed**
```bash
# Check MySQL service
sudo systemctl status mysql

# Verify database exists
mysql -u username -p -e "SHOW DATABASES;"

# Test connection string
npx prisma db pull
```

**2. Redis Connection Failed**
```bash
# Check Redis service
sudo systemctl status redis-server

# Test Redis connection
redis-cli ping

# Check Redis logs
sudo journalctl -u redis-server
```

**3. Email Sending Failed**
- Verify Gmail app password is correct
- Check 2FA is enabled on Gmail account
- Ensure "Less secure app access" is disabled (use app passwords instead)
- Check email quota limits

**4. Queue Processing Issues**
```bash
# Monitor queue status
redis-cli
> KEYS *queue*
> LLEN queue-mailer
```

### Debug Mode

Enable detailed logging by setting environment variable:
```bash
DEBUG=true npm run dev
```

## 🛠️ Development Tools

### Available Scripts
```bash
npm run dev       # Start development server with nodemon
npm start         # Start production server
npm run build     # Compile TypeScript (if build script added)
```

### Prisma Commands
```bash
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes to database
npx prisma db pull       # Pull database schema to Prisma
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create and apply new migration
```

### Redis Monitoring
```bash
redis-cli monitor        # Monitor all Redis commands
redis-cli info           # Redis server information
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` files
- **Input Validation**: All inputs validated with Zod schemas
- **CORS**: Configured for specific origins only
- **Error Handling**: No sensitive data in error responses
- **Rate Limiting**: Consider implementing for production
- **HTTPS**: Use HTTPS in production environments

## 🏃‍♂️ Production Deployment

### Environment Setup
1. **Process Manager**: Use PM2 or similar for production
2. **Reverse Proxy**: Configure Nginx or Apache
3. **SSL Certificate**: Implement HTTPS
4. **Database**: Use managed MySQL service
5. **Redis**: Use managed Redis service
6. **Monitoring**: Implement application monitoring

### Example PM2 Configuration
```json
{
  "name": "weshot-backend",
  "script": "dist/server.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "production",
    "PORT": 3001
  }
}
```

---

**Built with ❤️ using Express.js + TypeScript + MySQL + Redis**