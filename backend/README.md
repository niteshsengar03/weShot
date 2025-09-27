# WeShot Backend - Express.js API Server

![Backend Badge](https://img.shields.io/badge/Backend-Express.js%20%2B%20TypeScript-green?style=for-the-badge)
![Database Badge](https://img.shields.io/badge/Database-MySQL%20%2B%20Prisma-blue?style=for-the-badge)
![Queue Badge](https://img.shields.io/badge/Queue-Redis%20%2B%20BullMQ-red?style=for-the-badge)

## 🎯 Overview

The WeShot backend is a robust Express.js API server built with TypeScript that handles student registration, placement data processing, and automated email notifications. It features a clean architecture with proper separation of concerns, comprehensive error handling, and scalable queue-based email processing.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- Redis 6.0+
- Gmail account (for SMTP)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 3. Setup database
npx prisma generate
npx prisma db push

# 4. Start development server
npm run dev
```

## 📝 Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/weshot_db"

# Server
PORT=3001

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Gmail SMTP
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-gmail-app-password
```

## 📋 API Endpoints

### Student Registration

```http
POST /api/v1/student/create-student
Content-Type: application/json

{
  "regNo": "22BLC1234",
  "name": "John Doe",
  "email": "john.doe@vitchennai.ac.in"
}
```

### Placement Notifications

```http
POST /api/v1/student/n8n
Content-Type: application/json

[
  {
    "reg": "22BLC1234",
    "name": "John Doe",
    "email": "john.doe@vitchennai.ac.in",
    "subject": "Shortlisted for Google Interview"
  }
]
```

## 🛠️ Architecture

- **Framework**: Express.js + TypeScript
- **Database**: MySQL + Prisma ORM
- **Queue**: Redis + BullMQ
- **Email**: Nodemailer + Gmail SMTP
- **Validation**: Zod schemas
- **Logging**: Winston

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── DTO/            # Data Transfer Objects
├── middlewares/    # Express middlewares
├── prisma/         # Database schema
├── producer/       # Queue producers
├── processor/      # Queue processors
├── queue/          # Queue configs
├── repositories/   # Database access
├── routers/        # API routes
├── service/        # Business logic
├── templates/      # Email templates
├── types/          # TypeScript types
├── utils/          # Utility functions
├── validator/      # Input validation
└── server.ts       # App entry point
```

## 🔧 Development

```bash
# Development with auto-reload
npm run dev

# Production mode
npm start

# Database GUI
npx prisma studio

# View logs
tail -f logs/application-*.log
```

## 🐛 Troubleshooting

**Database Connection Issues:**

```bash
# Test MySQL connection
mysql -u username -p -e "SHOW DATABASES;"
npx prisma db pull
```

**Redis Connection Issues:**

```bash
# Test Redis connection
redis-cli ping
```

**Email Issues:**

- Verify Gmail app password
- Check 2FA is enabled
- Ensure correct SMTP settings

## 📖 Full Documentation

For complete setup instructions, API documentation, database schema, queue system details, and deployment guides, see:

**[BACKEND_README.md](./BACKEND_README.md)** - Complete backend documentation

---

**Built with ❤️ using Express.js + TypeScript + MySQL + Redis**
