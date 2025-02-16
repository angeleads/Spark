# Spark AI

<p align="center">
  <em>🌟 SPARK AI</em>
</p>

***<h1 align="center">
  Your AI-powered web companion that brings a spark to digital interactions
</h1>***

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

## Overview

🌟 Spark is an AI-powered companion designed to bring warmth and engagement to digital interactions. It creates meaningful conversations by remembering user preferences and past interactions, offering everything from casual chats to emotional support.

Through advanced language models, Spark adapts its personality to each user, providing personalized responses, mood-based support, and entertainment through jokes and fun facts. The project aims to create a judgment-free space where users can freely express themselves while enjoying the company of an AI friend that learns and grows with them over time.

## Features

- 💬 **Natural Conversations**: Engage in flowing, natural dialogue with an AI that remembers context
- 🧠 **Memory & Personalization**: Spark remembers your preferences and past interactions
- 🎭 **Adaptive Personality**: Responds differently based on your mood and needs
- 🎯 **Emotional Support**: Provides encouragement, advice, and a listening ear
- 🎮 **Entertainment**: Shares jokes, fun facts, and engaging content
- 🔒 **Privacy-Focused**: Your conversations stay private and secure

## Tech Stack

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Firebase (Firestore, Authentication)
- **AI**: Google Gemini API
- **State Management**: React Hooks
- **Styling**: TailwindCSS with custom animations
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Firebase account
- Google AI Platform account with Gemini API access

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:angeleads/Spark.git
   cd Spark
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   GOOGLE_AI_KEY=your_gemini_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Set up security rules for your Firestore database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /conversations/{messageId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### Google Gemini API Setup

1. Go to [Google AI Platform](https://ai.google.dev/)
2. Create a project and enable the Gemini API
3. Generate an API key and add it to your `.env.local` file

## Usage

### Authentication

Users can sign up and log in using email and password. Each user has their own private conversation history with Spark.

### Conversation

The chat interface allows users to:
- Send messages to Spark
- See when Spark is typing with a smooth animation
- View conversation history
- Experience Spark's adaptive personality based on context


## Project Structure

```
Spark/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── auth/
│   │   └── page.tsx
│   │   └── layout.tsx
│   ├── chat/
│   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── AuthForm.tsx
│   ├── chat/
│   │   ├── ChatInput.tsx
│   │   └── ChatWindow.tsx
│   └── layout/
│       ├── AiIntegration.tsx
├── lib/
│   ├── firebase.ts
│   └── firebaseAdmin.ts

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Firebase](https://firebase.google.com/) - Backend services
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Google Gemini](https://ai.google.dev/) - AI model provider

---

<p align="center">
  Made with ❤️ by Angel
</p>