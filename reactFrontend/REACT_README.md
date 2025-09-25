# WeShot React Frontend

A modern React frontend built with Vite and TypeScript for student registration.

## Features

- 📝 Clean, modern student registration form
- ✅ Real-time form validation
- 🎨 Beautiful UI with gradient backgrounds
- 📱 Responsive design
- ⚡ Fast loading with Vite
- 🔗 Connects to Express.js backend API

## Form Fields

- **Registration Number**: 9-10 characters (validated)
- **Full Name**: Required field
- **Email**: Valid email format required

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:3001`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Backend Connection

The frontend connects to your backend API at:
- **Endpoint**: `POST /api/v1/student/create-student`
- **Expected Data**: `{ regNo: string, name: string, email: string }`

## Usage

1. Make sure your backend server is running on port 3001
2. Start this React frontend with `npm run dev`
3. Open `http://localhost:5173` in your browser
4. Fill out the registration form
5. Submit to see success/error messages

## API Integration

The app uses Axios for HTTP requests and includes:
- Error handling for network issues
- Loading states during form submission
- Success/failure message display
- Form validation before submission

## Technologies Used

- React 18 with TypeScript
- Vite for fast development
- Axios for API calls
- CSS3 with modern features (gradients, backdrop-filter)
- Responsive design principles