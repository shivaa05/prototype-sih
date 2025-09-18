# Krishi Sahayi - Digital Farming Companion

## Overview

Krishi Sahayi is a modern web application designed to empower Indian farmers with data-driven insights for better yield and income. The platform provides comprehensive farming tools including weather forecasting, crop advisory, market insights, government schemes information, and AI-powered plant disease detection through image analysis. Built with a nature-inspired design featuring green and earthy tones, the application offers a farmer-friendly interface with smooth animations and responsive mobile-first design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Routing**: Wouter for lightweight client-side routing with two main routes (Home and AI Mode)
- **Styling**: Tailwind CSS with custom design tokens for nature-inspired theming (green, yellow, earthy tones)
- **UI Components**: Shadcn/ui component library built on Radix UI primitives for accessibility and consistency
- **Animations**: Framer Motion for smooth transitions, hover effects, and page animations
- **State Management**: React Query (TanStack Query) for server state management and caching
- **Build System**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript for full-stack type safety
- **File Uploads**: Multer middleware for handling image uploads with size and type validation
- **Session Management**: Express session handling with PostgreSQL session storage
- **Development**: Hot module replacement and development middleware integration

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Database**: PostgreSQL with Neon serverless hosting for scalability
- **Schema**: Structured tables for users, disease detections with JSON fields for recommendations
- **Validation**: Zod schemas for runtime type validation across shared interfaces

### AI/ML Integration
- **Disease Detection**: Mock API implementation simulating AI plant disease analysis
- **Image Processing**: Client-side image handling with drag-and-drop upload functionality
- **Results Processing**: Confidence scoring, severity assessment, and treatment recommendations
- **Heatmap Generation**: Visual disease identification overlays for enhanced user understanding

### External Dependencies
- **Database**: Neon PostgreSQL serverless database for production scalability
- **Fonts**: Google Fonts integration (Inter, DM Sans) for consistent typography
- **Icons**: Lucide React for consistent iconography throughout the application
- **Form Handling**: React Hook Form with Hookform Resolvers for form validation
- **Date Utilities**: Date-fns for date manipulation and formatting

The architecture follows a modern full-stack pattern with clear separation of concerns, type safety across all layers, and optimized performance for both development and production environments. The application is designed to be mobile-first with progressive enhancement for larger screens.