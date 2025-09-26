# WeShot - VIT Chennai Placement Notification System

![WeShot Banner](https://img.shields.io/badge/WeShot-VIT%20Chennai%20Placement%20System-blue?style=for-the-badge)

## 🎯 Project Overview

**WeShot** is a comprehensive placement notification system specifically designed for VIT Chennai students. The system helps students stay updated about placement opportunities by collecting their registration details and automatically sending email notifications when they get shortlisted by companies.

### 🏗️ System Architecture

The application follows a modern microservices architecture with clean separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │────│  Express.js API │────│   MySQL Database│
│   (Port: 5173)   │    │   (Port: 3001)  │    │   (Prisma ORM)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                │
                       ┌─────────────────┐
                       │   Redis Queue   │
                       │   (BullMQ)      │
                       └─────────────────┘
                                │
                       ┌─────────────────┐
                       │ Email Service   │
                       │  (Nodemailer)   │
                       └─────────────────┘
```

## 🚀 Key Features

### 📝 Student Registration
- **Web Interface**: Beautiful, responsive React frontend for student registration
- **Form Validation**: Real-time validation with proper error handling
- **Data Storage**: Secure storage of student details (Registration No., Name, Email)
- **Duplicate Prevention**: Prevents duplicate registrations using unique registration numbers

### 🔄 Placement Data Processing
- **N8N Integration**: RESTful API endpoint for external placement data ingestion
- **Student Matching**: Intelligent matching of placement data with registered students
- **Bulk Processing**: Handles multiple placement notifications simultaneously

### 📧 Automated Email Notifications
- **Queue System**: Redis-powered BullMQ queue for reliable email processing
- **Template Engine**: Handlebars-based email templates for professional notifications
- **Background Processing**: Asynchronous email sending to ensure system responsiveness
- **Error Handling**: Robust error handling with retry mechanisms

### 🛠️ Technical Excellence
- **TypeScript**: Fully typed codebase for better development experience
- **Input Validation**: Zod schema validation for API endpoints
- **Logging**: Comprehensive logging with Winston for monitoring and debugging
- **Error Management**: Custom error classes with proper HTTP status codes
- **CORS**: Properly configured CORS for secure cross-origin requests

## 📁 Project Structure

```
weShot/
├── backend/                 # Express.js API Server
│   ├── src/
│   │   ├── config/          # Configuration files (Redis, Database, Mailer)
│   │   ├── controllers/     # Request handlers
│   │   ├── DTO/            # Data Transfer Objects
│   │   ├── middlewares/    # Express middlewares
│   │   ├── prisma/         # Database schema and client
│   │   ├── producer/       # Queue job producers
│   │   ├── processor/      # Queue job processors
│   │   ├── queue/          # Queue configurations
│   │   ├── repositories/   # Database access layer
│   │   ├── routers/        # API route definitions
│   │   ├── service/        # Business logic layer
│   │   ├── templates/      # Email template handlers
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions and error classes
│   │   └── validator/      # Input validation schemas
│   └── README.md           # Backend-specific documentation
│
├── reactFrontend/          # React.js Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API integration services
│   │   └── assets/         # Static assets
│   └── README.md           # Frontend-specific documentation
│
└── README.md               # This file - Project overview
```

## 🛡️ Security Features

- **Input Sanitization**: All inputs are validated and sanitized
- **CORS Protection**: Configured to allow requests only from authorized origins
- **Error Handling**: Sensitive information is never exposed in error messages
- **Environment Variables**: Secure configuration management

## 🔧 Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: MySQL with Prisma ORM
- **Queue System**: Redis + BullMQ
- **Email Service**: Nodemailer with Gmail
- **Template Engine**: Handlebars
- **Validation**: Zod
- **Logging**: Winston

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: Custom CSS with modern features
- **UI/UX**: Responsive design with gradient backgrounds

### Infrastructure
- **Database**: MySQL
- **Cache/Queue**: Redis
- **Email Provider**: Gmail SMTP

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- MySQL database server
- Redis server
- Gmail account with app password (for email notifications)

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weShot
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Configure environment variables (see backend/README.md)
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd reactFrontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📖 Detailed Documentation

For detailed setup instructions, API documentation, and configuration guides:

- **[Backend Documentation](./backend/README.md)** - Complete backend setup, API endpoints, and configuration
- **[Frontend Documentation](./reactFrontend/README.md)** - Frontend setup, components, and usage

## 🎯 Use Cases

### For Students
1. **Registration**: Students register once with their VIT registration number, name, and email
2. **Notifications**: Receive automatic email alerts when shortlisted for placement opportunities
3. **Updates**: Stay informed about placement processes without manual checking

### For Placement Coordinators
1. **Data Integration**: Import placement data from external sources via API
2. **Bulk Notifications**: Send notifications to multiple students simultaneously
3. **Tracking**: Monitor email delivery and system performance

### For Developers/System Integrators
1. **API Integration**: Easy REST API integration for external systems
2. **Scalable Architecture**: Queue-based system handles high volume efficiently
3. **Monitoring**: Comprehensive logging for system monitoring and debugging

## 🤝 Contributing

This project is designed to be maintainable and extensible. Key areas for contribution:
- Additional email templates
- Enhanced notification features
- Performance optimizations
- Security improvements

## 📄 License

ISC License - Feel free to use this project for educational and commercial purposes.

---

**Built with ❤️  for VIT Chennai Students**
