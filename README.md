# StudyNotion

StudyNotion is a comprehensive MERN stack-based EdTech platform designed to empower students and educators by providing a seamless learning experience. The platform offers features such as course management, user authentication, dynamic content delivery, and more.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)

---

## Features

- **User Authentication:** Secure registration and login with JWT-based authentication.
- **Role-Based Access Control:** Separate roles for students and educators.
- **Course Management:** Create, update, and manage courses.
- **Dynamic Content Delivery:** Video lectures, quizzes, and resources.
- **Responsive Design:** Fully optimized for desktop and mobile.
- **Analytics Dashboard:** Insights for educators on student engagement.
- **Payment Integration:** Secure payments for premium courses.

---

## Tech Stack

- **Frontend:** React, Redux, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Hosting:** Vercel (Frontend), Render/Heroku (Backend)
- **Version Control:** Git and GitHub

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/studynotion.git
   cd studynotion
   ```

2. **Install dependencies:**
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     MONGO_URI=your-mongodb-connection-string
     JWT_SECRET=your-jwt-secret
     PORT=5000
     CLIENT_URL=http://localhost:3000
     ```

4. **Run the application:**
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Project Structure

```plaintext
studynotion/
├── frontend/          # React frontend
│   ├── public/        # Public assets
│   ├── src/           # Source files
│   ├── package.json   # Frontend dependencies
├── backend/           # Express backend
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── controllers/   # Business logic
│   ├── middlewares/   # Custom middleware
│   ├── utils/         # Utility functions
│   ├── package.json   # Backend dependencies
├── README.md          # Documentation
```

---

## Available Scripts

### Frontend

- **Start:**
  ```bash
  npm start
  ```
- **Build:**
  ```bash
  npm run build
  ```

### Backend

- **Start:**
  ```bash
  npm start
  ```
- **Development:**
  ```bash
  npm run dev
  ```

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---
