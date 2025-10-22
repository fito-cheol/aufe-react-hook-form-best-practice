# React Hook Form Best Practice

A comprehensive React application demonstrating best practices for form handling with React Hook Form. This project showcases various form patterns, validation techniques, and advanced features through practical examples.

## 🚀 Features

- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with hooks and concurrent features
- 🔷 **TypeScript** - Type safety and better developer experience
- 🛣️ **React Router** - Client-side routing for single-page applications
- 📝 **React Hook Form** - Performant, flexible forms with easy validation
- 🎨 **Modern CSS** - Responsive design with CSS Grid and Flexbox
- ✅ **Zod** - TypeScript-first schema validation

## 📦 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router DOM
- **Form Management**: React Hook Form
- **Validation**: Zod + @hookform/resolvers
- **Styling**: CSS3 with modern features

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aufe-react-hook-form-best-practice

# Install dependencies
npm install
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start development server (alternative)
npm start
```

### Development Server

The development server will start on `http://localhost:5173` by default.

## 📁 Project Structure

```
src/
├── pages/           # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── App.tsx         # Main application component with routing
├── App.css         # Application styles
├── main.tsx        # Application entry point
└── index.css       # Global styles
```

## 🎯 Features Implemented

- ✅ Vite + React + TypeScript setup
- ✅ React Router for client-side routing
- ✅ React Hook Form integration
- ✅ Comprehensive form examples
- ✅ Responsive navigation
- ✅ Modern CSS styling
- ✅ TypeScript configuration
- ✅ Development and build scripts

## 📚 Form Examples

This project includes comprehensive examples demonstrating React Hook Form best practices:

### 1. **기본 폼 (Basic Form)**

- Simple form with basic validation
- Error handling and display
- Form reset functionality

### 2. **유효성 검사 (Validation)**

- Zod schema validation
- Complex validation rules
- Real-time error feedback
- Custom validation messages

### 3. **동적 필드 (Dynamic Fields)**

- `useFieldArray` for dynamic form fields
- Add/remove fields dynamically
- Field reordering capabilities
- Nested validation

### 4. **파일 업로드 (File Upload)**

- Multiple file types support
- File size and type validation
- File preview functionality
- Drag and drop support

### 5. **커스텀 컴포넌트 (Custom Components)**

- `Controller` component usage
- Custom input components
- Reusable form components
- Advanced form controls

### 6. **조건부 필드 (Conditional Fields)**

- `useWatch` for conditional rendering
- Dynamic field visibility
- Complex conditional logic
- User type-based forms

### 7. **배열 필드 (Array Fields)**

- Dynamic array management
- Complex nested arrays
- Field manipulation (add/remove/move)
- Array validation

### 8. **중첩 객체 (Nested Objects)**

- Deep object structure handling
- Dot notation field access
- Complex nested validation
- Object manipulation

## 🚀 Getting Started

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open your browser and navigate to `http://localhost:5173`
4. Use the navigation menu to explore different pages

## 🎓 Learning Objectives

This project demonstrates:

- **Form State Management**: Using `useForm` hook for form state
- **Validation**: Implementing validation with Zod schemas
- **Dynamic Forms**: Creating forms with dynamic fields
- **File Handling**: Managing file uploads and validation
- **Custom Components**: Building reusable form components
- **Conditional Logic**: Implementing conditional field rendering
- **Array Management**: Handling dynamic arrays in forms
- **Nested Data**: Managing complex nested object structures

## 🔧 Key React Hook Form Concepts

- **`useForm`**: Main hook for form management
- **`register`**: Function to register form fields
- **`handleSubmit`**: Form submission handler
- **`Controller`**: Component for custom form controls
- **`useFieldArray`**: Hook for dynamic array fields
- **`useWatch`**: Hook for watching field values
- **`formState`**: Access to form state and errors
- **`reset`**: Function to reset form values

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
