# 🛒 MERN Stack eCommerce App

This is a **MERN stack-based eCommerce web application** developed for learning purposes. It supports **multiple user roles** — user, seller, and admin — and includes full authentication, product management, and payment processing functionality.

---

## 🚀 Tech Stack

### 🔹 Frontend:
- **React JS**
- **Redux Toolkit** – State management  
- **Redux Persist** – State persistence across page reloads  
- **React Router DOM** – Routing between pages  
- **React Hook Form** – Form management and validation  
- **Axios** – API communication  
- **Stripe JS** – Stripe integration for frontend payments  
- **Tailwind CSS** – Basic styling  
- **jwt-decode** – Decode JWT tokens on the frontend  
- **AI Tools like ChatGPT** – Used for markup/layout suggestions

### 🔹 Backend:
- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **MongoDB Atlas** – Cloud database
- **Mongoose** – ODM for MongoDB
- **JWT** – Token-based authentication and role-based access control
- **Bcrypt** – Password hashing
- **Cloudinary** – Product image storage
- **Multer** – File upload handling
- **NodeMailer** – Password reset functionality
- **dotenv** – Environment variable management

---

## 🔐 Roles & Permissions

- **User**
  - Register / Login / Logout
  - Reset password
  - Add items to cart
  - Checkout using Stripe

- **Seller**
  - Register seller account
  - Upload products
  - Edit/delete their own products

- **Admin**
  - View all users
  - Change user roles
  - Delete any user

---

## ✅ Features

- 🔑 User authentication and password reset  
- 🛒 Shopping cart functionality  
- 🧾 Stripe payment integration  
- 🖼️ Image upload via Cloudinary  
- 🧪 Role-based access and dashboard views  
- 🔧 Seller product management  
- 👮 Admin user management

---

## ⚠️ Notes

> 🎨 This project was focused entirely on backend logic, authentication, and role-based systems. I did **not focus on design, responsiveness, or layout polish** intentionally — those improvements may be added later if needed.

---

## 📽️ Demo

*(Insert your demo video link or screenshots here if you're uploading the project)*

---

## 📂 How to Run Locally

1. Clone the repository
2. Run `npm install` in both frontend and backend directories
3. Create `.env` files with necessary variables (like MongoDB URI, Stripe keys, JWT secret, etc.)
4. Start backend and frontend servers
5. Visit `http://localhost:3000`

---

## 📧 Contact

Feel free to reach out for feedback or collaboration ideas!

---
