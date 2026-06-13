# 🎓 E-Learning Platform

A full-stack online education platform developed as part of the **Digital Egypt Pioneers Initiative (DEPI)**. The platform enables students to browse and enroll in courses, instructors to manage their content, and provides a seamless video-based learning experience.

---

## 👥 Team Members

- Mohamed Yosry
- Marwan Mohamed
- Abderahman Ahmed

---

## 🗂️ Project Structure

```
E-Learning-website/
├── backend/              # NestJS REST API
├── DEPI-Angular-Project-main/  # Angular 20 Frontend
└── UI UX/               # React-based UI/UX prototype (Figma export)
```

---

## ✨ Features

### 👨‍🎓 Students
- Browse and search available courses
- View course details and instructor info
- Enroll in courses via Stripe payment
- Access video lessons through the course player
- Manage their profile and enrolled courses

### 👨‍🏫 Instructors
- Create, edit, and delete courses
- Add and manage lessons with video uploads (via Cloudinary)
- View enrolled students per course
- Manage instructor profile

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Student / Instructor)
- Route guards to protect dashboard and course player pages

---

## 🛠️ Tech Stack

### Frontend (Angular)
| Technology | Version |
|---|---|
| Angular | 20.x |
| Bootstrap | 5.3 |
| Font Awesome | 7.x |
| SweetAlert2 | 11.x |
| TypeScript | 5.9 |

### Backend (NestJS)
| Technology | Version |
|---|---|
| NestJS | 11.x |
| MongoDB + Mongoose | 8.x |
| JWT Authentication | 11.x |
| Cloudinary (media uploads) | 2.x |
| Stripe (payments) | 20.x |
| bcrypt | 6.x |
| class-validator | 0.14 |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)
- Cloudinary account
- Stripe account

---

### 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster.mongodb.net/elearning
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Run the backend:

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

The API runs on `http://localhost:3000` by default.

---

### 🎨 Frontend Setup (Angular)

```bash
cd DEPI-Angular-Project-main
npm install
npm start
```

The app runs on `http://localhost:4200` by default.

---

### 🖼️ UI/UX Prototype Setup

```bash
cd "UI UX"
npm install
npm run dev
```

> Original Figma design: [View on Figma](https://www.figma.com/design/n3yfv7IfDddwr7NRxKYJLx/Online-Education-Platform-UI-UX)

---

## 🗺️ Frontend Routes

| Route | Description | Access |
|---|---|---|
| `/home` | Landing page | Public |
| `/login` | Login page | Public |
| `/sign-up` | Registration page | Public |
| `/courses` | Browse all courses | Public |
| `/courses/:id` | Course details | Public |
| `/course/:id/player` | Video lesson player | Enrolled students |
| `/enrollments/success` | Payment success page | Authenticated |
| `/student/*` | Student dashboard | Students only |
| `/instructor/*` | Instructor dashboard | Instructors only |

---

## 🔌 Backend Modules

| Module | Description |
|---|---|
| `Auth` | Login, JWT token issuance |
| `Users` | User registration and profile management |
| `Courses` | CRUD operations for courses |
| `Lessons` | Lesson management with video support |
| `Enrollments` | Student course enrollment tracking |
| `Reviews` | Course ratings and reviews |
| `Stripe` | Payment checkout and webhook handling |
| `Cloudinary` | Image and video upload service |

---

## 🧪 Running Tests

```bash
# Backend unit tests
cd backend
npm run test

# Backend e2e tests
npm run test:e2e

# Backend test coverage
npm run test:cov

# Frontend unit tests
cd DEPI-Angular-Project-main
npm test
```

---

## 📁 Additional Resources

- 📄 SRS Document: `DEPI-Angular-Project-main/SRS DEPI.docx`
- 📁 Google Drive: [Project Files](https://drive.google.com/drive/folders/1lSgGDEABr6v1qynmX31JlbKe-QKJz3_i?usp=drive_link)

---

## 📄 License

This project is for educational purposes as part of the **Digital Egypt Pioneers Initiative (DEPI)**.
