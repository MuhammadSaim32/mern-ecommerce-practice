# 🛒 MERN Stack eCommerce App

This is a **MERN stack-based eCommerce web application** developed for learning purposes. It supports **multiple user roles** — user, seller, and admin — and includes authentication, product management, product reviews, and an order management system.

---

## 🚀 Tech Stack

### 🔹 Frontend:
- **React JS**  
- **Redux Toolkit** – State management  
- **Redux Persist** – State persistence  
- **React Router DOM** – Routing  
- **React Hook Form** – Form validation  
- **Axios** – API communication  
- **Stripe JS** – Payment integration  
- **Tailwind CSS** – Basic styling  
- **jwt-decode** – Decode JWT tokens  
- **AI Tools (ChatGPT)** – Used for layout design and markup  

**🟢 Deployed on:** [Vercel](https://vercel.com)

---

### 🔹 Backend:
- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB Atlas** – Cloud database  
- **Mongoose** – ODM for MongoDB  
- **JWT** – Token-based authentication and role-based access  
- **Bcrypt** – Password hashing  
- **Cloudinary** – Product image storage  
- **Multer** – File upload handling  
- **NodeMailer** – Password reset functionality  
- **dotenv** – Environment variable management  
- **Stripe Webhook** – Real-time checkout event listener (used to clear the user’s cart after successful payments)  

**🟢 Deployed on:** [Railway](https://railway.app)

---

## 🔐 Roles & Permissions

### 🟢 User
- Register / Login / Logout  
- Reset password  
- Add items to cart  
- Checkout using Stripe  
- Leave, edit, or delete product reviews  

### 🏪 Seller
- Register as seller  
- Upload and manage products  
- Edit or delete own products  
- Manage orders — manually update order status (*Pending*, *Processing*, *Delivered*)  

### 🟢 Admin
- View all users  
- Change user roles  
- Delete any user  

---

## ✅ Features

- 🔑 JWT-based authentication and authorization  
- 📧 Password reset with NodeMailer  
- 🛒 Shopping cart and Stripe checkout  
- ⚡ **Stripe Webhook Integration** — automatically receives events from Stripe after successful payments and clears the related user’s cart  
- 🧾 Order management system (seller updates order status manually)  
- 💬 Review system – users can post, edit, and delete reviews like comments  
- 🖼️ Image upload via Cloudinary  
- 🟢 Admin dashboard for user and role management  
- ⚙️ Modular backend with controllers, middleware, and routes  

---

## ⚙️ Payment Flow

1. User proceeds to checkout and completes payment through **Stripe Checkout**.  
2. Stripe triggers a **Webhook event** to the backend confirming payment success.  
3. The backend processes the event, verifies the signature, and clears the corresponding user’s cart.  
4. The order details are saved to the database and visible to both user and seller.

---

## ⚠️ Notes

> 🎨 This project focuses mainly on **backend logic**, authentication, and system architecture.  
> The **frontend layout and markup** were created using **AI tools (ChatGPT)**.  

---

## 📽️ Demo

[*(Watch demo video)*](https://www.linkedin.com/feed/update/urn:li:activity:7327070193967382530/)

**🌐 Live Link:**  
https://mern-ecommerce-practice.vercel.app/
