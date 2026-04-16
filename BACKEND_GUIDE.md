# Nodemailer Backend Setup Guide

I have migrated the portfolio from **EmailJS** to a custom **Node.js/Nodemailer** backend. This setup provides a more secure and flexible way to handle your contact and booking forms.

## 🛠️ Action Required: Configure Credentials

Before the forms can send emails, you must provide your SMTP details in the `.env` file at the root of the project.

### 1. The .env File
Open the `.env` file and replace the placeholders:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_RECEIVER=your-receiving-email@gmail.com
```

### 2. Gmail Setup (Recommended)
If using Gmail, enable **2-Step Verification** and generate an **App Password** from your Google Account settings. Use that 16-character code as your `EMAIL_PASS`.

---

## 🚀 Changes Made

### 📁 New Backend
- **server/index.js**: The core Express server. It listens for POST requests at `/api/send-email`.
- **package.json**: Added `express`, `nodemailer`, `cors`, and `dotenv`.
- **Scripts**: New commands `npm run server` and `npm run dev:all` (runs both frontend and backend).

### 🖥️ Updated Frontend
- **src/pages/BookingPage.jsx**: Removed EmailJS SDK. Now calls the local backend API.
- **src/components/ContactForm.jsx**: Now truly sends data instead of just simulating.

---

## 💻 Running the Application

To start both the website and the backend server together:
```bash
npm run dev:all
```

The website will be at `http://localhost:5173`.
The backend will be at `http://localhost:5000`.
