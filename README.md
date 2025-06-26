# Ginko - Parent Onboarding App

A React Native mobile application designed to help parents and guardians manage their family information in a safe, intuitive way. This app serves as the onboarding experience for the Ginko family safety platform.

## 🎯 Project Overview

Ginko is a family safety platform that helps parents and guardians keep track of their family members and their relationships. This onboarding app provides a smooth, step-by-step process for users to set up their family profile and begin their safety journey.

### Key Features
- **Multi-step onboarding process** with form validation
- **Family member management** (add, edit, delete)
- **Relationship quality tracking** for better family dynamics
- **Responsive design** with native mobile experience
- **Local data persistence** for offline functionality

## 🏗️ Technical Architecture

### Tech Stack
- **React Native** with Expo for cross-platform development
- **TypeScript** for type safety and better developer experience
- **Gluestack UI** + **NativeWind** for consistent, accessible components
- **React Hook Form** + **Zod** for form validation
- **React Navigation** for seamless navigation

### Key Technical Decisions

#### 1. **React Native + Expo**
- **Why**: Cross-platform development with native performance
- **Benefits**: Single codebase for iOS/Android, rapid development with Expo
- **Trade-off**: Limited access to some native APIs, but sufficient for this use case

#### 2. **Gluestack UI + NativeWind**
- **Why**: Consistent design system with utility-first CSS
- **Benefits**: Pre-built accessible components, responsive design, theme support
- **Trade-off**: Learning curve for the component library, but better than building from scratch

#### 3. **Local Storage Only**
- **Why**: Simplified architecture for demo purposes
- **Benefits**: Works offline, no backend dependencies, faster development
- **Trade-off**: No data sync across devices, but appropriate for MVP

#### 4. **Context API for State Management**
- **Why**: Built-in React solution, no external dependencies
- **Benefits**: Simple setup, good for small-medium apps
- **Trade-off**: Could become complex with larger state, but sufficient for current scope

## 🎨 User Experience Design

### Onboarding Flow
The app features a 3-step onboarding process:

1. **Personal Information** - Name, email, phone, role
2. **Family Goals & Values** - Understanding family priorities
3. **Family Member Management** - Adding and managing family members

### Design Principles
- **Progressive disclosure** - Information revealed step by step
- **Form validation** - Real-time feedback and error handling
- **Accessible design** - Following WCAG guidelines
- **Intuitive navigation** - Clear visual hierarchy and feedback

## 📱 Core Features

### Family Member Management
- Add new family members with detailed information
- Edit existing member details
- Delete members with confirmation
- Track relationship quality (1-5 scale)

### Data Model
```typescript
interface FamilyMemberDTO {
  id?: number
  userId: string
  name: string
  age: number
  relation: string
  genderIdentity: string
  guardiansRelationshipQuality: number
}
```

### User Profile
```typescript
interface UserDTO {
  id: string
  name: string
  phone: string
  email: string
  role: string
  familyGoals: string
  familyValues: string
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd parent-onboarding

# Install dependencies
npm install

# Start the development server
npm run start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Gluestack UI components
│   ├── SignUpFirstStep/
│   ├── SignUpSecondStep/
│   └── SignUpThirdStep/
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── routes/             # Navigation configuration
├── screen/             # Main application screens
├── services/           # Business logic and API calls
├── storage/            # Local storage utilities
└── types/              # TypeScript type definitions
```
---

**Note**: This is a demo application showcasing React Native development skills and user experience design. It's not intended for production use without significant additional development and security measures. 