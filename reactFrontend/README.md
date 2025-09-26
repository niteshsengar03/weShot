# WeShot React Frontend

![Frontend Badge](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue?style=for-the-badge)
![Build Tool Badge](https://img.shields.io/badge/Build-Vite-yellow?style=for-the-badge)
![Styling Badge](https://img.shields.io/badge/Styling-CSS3%20%2B%20Modern%20Features-purple?style=for-the-badge)

## 🎯 Overview

The WeShot frontend is a modern React application built with TypeScript and Vite that provides a beautiful, responsive interface for VIT Chennai students to register for placement notifications. The application features real-time form validation, elegant UI design, and seamless integration with the Express.js backend.

## 🌟 Features

### 📝 Student Registration Form
- **Modern UI**: Beautiful gradient backgrounds with glassmorphism effects
- **Real-time Validation**: Instant feedback on form inputs with error handling
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Floating Labels**: Smooth animated labels for better user experience
- **Loading States**: Visual feedback during form submission

### 🛡️ Input Validation
- **Registration Number**: 9-10 character validation matching backend requirements
- **Email Format**: Proper email format validation with regex
- **Required Fields**: All fields validated for completeness
- **Error Display**: Clear error messages with styling

### 🔗 Backend Integration
- **API Service Layer**: Clean separation of API calls from components
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Success Feedback**: Confirmation messages on successful registration
- **Network Error Handling**: Graceful handling of connection issues

### 🎨 Modern Design
- **Gradient Backgrounds**: Beautiful purple-to-blue gradients
- **Backdrop Blur**: Modern glassmorphism effects
- **Smooth Animations**: Hover effects and transitions
- **Inter Font**: Professional typography
- **Box Shadows**: Depth and elevation effects

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── StudentForm.tsx      # Main registration form component
│   └── StudentForm.css      # Component-specific styles
│
├── services/               # API integration layer
│   └── api.ts              # API service with Axios
│
├── assets/                # Static assets
│   └── react.svg           # React logo
│
├── App.tsx                # Main App component
├── App.css                # Global app styles
├── index.css              # Global CSS reset and base styles
├── main.tsx               # Application entry point
└── vite-env.d.ts          # Vite environment types
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed on your system
- **Backend server** running on `http://localhost:3001`
- Modern web browser with JavaScript enabled

### 🔧 Installation & Setup

#### 1. Install Dependencies

```bash
cd reactFrontend
npm install
```

#### 2. Environment Configuration

The frontend is pre-configured to connect to the backend at `http://localhost:3001`. If your backend runs on a different port, update the API configuration in:

`src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:3001/api/v1';
```

#### 3. Start Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

#### 4. Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📋 Component Architecture

### StudentForm Component

The main component handling student registration:

**Key Features:**
- **State Management**: Uses React hooks for form state and validation
- **Form Validation**: Real-time validation with error state management
- **API Integration**: Connects to backend via the API service layer
- **User Feedback**: Loading states, success messages, and error handling

**Component Structure:**
```typescript
interface FormErrors {
  regNo?: string;
  name?: string;
  email?: string;
}

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentData>({
    regNo: '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{text: string; type: 'success' | 'error'} | null>(null);
  // ... component logic
};
```

### API Service Layer

Clean separation of API logic from components:

```typescript
export interface StudentData {
  regNo: string;
  name: string;
  email: string;
}

export interface StudentResponse {
  message: {
    id: number;
    regNo: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}

export const studentAPI = {
  createStudent: async (studentData: StudentData): Promise<StudentResponse> => {
    // API call implementation
  },
};
```

## 🎨 Styling Architecture

### Design System

**Color Palette:**
- Primary Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Success: `linear-gradient(135deg, #48bb78, #38a169)`
- Error: `linear-gradient(135deg, #f56565, #e53e3e)`
- Background: `#f7fafc`
- Glass Effect: `rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(10px)`

**Typography:**
- Font Family: Inter (Google Fonts)
- Heading: 2.5rem, weight 700
- Body: 1rem, weight 400
- Labels: 0.75rem when active, weight 500

**Layout:**
- Container: Max-width 500px, centered with padding
- Form Fields: 20px gap between elements
- Border Radius: 10px for modern look
- Box Shadows: Layered shadows for depth

### Responsive Design

```css
/* Mobile-first approach */
@media (max-width: 600px) {
  .form-wrapper {
    padding: 30px 20px;
    margin: 10px;
  }
  
  .form-title {
    font-size: 2rem;
  }
}
```

## 🔄 Form Validation

### Client-Side Validation Rules

**Registration Number:**
- Required field
- 9-10 characters length
- Matches backend Zod schema requirements

**Name:**
- Required field
- No special character restrictions

**Email:**
- Required field
- Valid email format using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Validation Flow

1. **Real-time Validation**: Errors clear as user types
2. **Submit Validation**: Full validation before API call
3. **Server Validation**: Backend validation errors displayed
4. **Success Handling**: Form reset on successful submission

## 📡 API Integration

### Axios Configuration

```typescript
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Error Handling

Comprehensive error handling for different scenarios:

```typescript
try {
  const response = await studentAPI.createStudent(formData);
  // Success handling
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) {
      // Handle duplicate registration
    } else if (error.code === 'ECONNREFUSED') {
      // Handle connection errors
    } else {
      // Handle other server errors
    }
  } else {
    // Handle network errors
  }
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

### Development Workflow

1. **Component Development**: Create components in `src/components/`
2. **Styling**: Use CSS modules or component-specific CSS files
3. **API Integration**: Add new API calls to `src/services/api.ts`
4. **Type Safety**: Define interfaces for all data structures
5. **Testing**: Test components with different input scenarios

## 🏃‍♂️ Performance

### Optimization Features

- **Vite Build Tool**: Ultra-fast development and optimized production builds
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Automatic code splitting for better loading
- **Asset Optimization**: Image and CSS optimization
- **TypeScript**: Compile-time optimizations

### Bundle Size

Optimized production bundle:
- **Vendor Chunks**: Separate chunks for dependencies
- **CSS Extraction**: Separate CSS files for better caching
- **Compression**: Gzipped assets

## 📦 Building for Production

### Production Build Process

```bash
# Create optimized production build
npm run build

# Output directory: dist/
# - index.html (entry point)
# - assets/ (CSS, JS, images)
```

### Deployment Options

**Static Hosting:**
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Server Deployment:**
- Nginx (serve static files)
- Apache
- Express.js static server

### Environment Variables (if needed)

```typescript
// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Failed**
```bash
# Check if backend is running
curl http://localhost:3001/api/v1/

# Check browser console for CORS errors
# Verify backend CORS configuration includes frontend port
```

**2. Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit
```

**3. Development Server Issues**
```bash
# Check if port 5173 is available
lsof -i :5173

# Try different port
npm run dev -- --port 3000
```

**4. Styling Issues**
- Check browser developer tools for CSS conflicts
- Verify import statements for CSS files
- Check for CSS specificity issues

### Debug Mode

Enable detailed API logging:
```typescript
// In api.ts, add console.log statements
console.log('Sending data to API:', studentData);
console.log('API Response:', response.data);
```

## 🔒 Security Considerations

- **Input Sanitization**: All inputs are validated before sending to API
- **XSS Prevention**: React's built-in XSS protection
- **HTTPS**: Use HTTPS in production
- **Environment Variables**: Keep sensitive data in environment variables
- **Dependencies**: Regularly update dependencies for security patches

## 🚀 Future Enhancements

Possible improvements and features:

- **Form Persistence**: Save form data in localStorage
- **Multi-step Form**: Break registration into steps
- **File Upload**: Add profile picture upload
- **Dark Mode**: Theme switching capability
- **Internationalization**: Multi-language support
- **PWA**: Progressive Web App features
- **Accessibility**: Enhanced ARIA labels and keyboard navigation

## 📖 Additional Resources

### Documentation Links

- **[React Documentation](https://react.dev/)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[Vite Guide](https://vitejs.dev/guide/)**
- **[Axios Documentation](https://axios-http.com/docs/intro)**

### Useful Tools

- **React Developer Tools**: Browser extension for debugging
- **TypeScript Playground**: Online TypeScript testing
- **CSS Grid Generator**: For layout designs
- **Color Palette Generators**: For design consistency

---

**Built with ❤️ using React + TypeScript + Vite + Modern CSS**
