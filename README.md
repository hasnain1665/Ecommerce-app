# E-Commerce Full Stack Application (MERN)

> **Tech Stack:** React.js · Node.js · Express · MongoDB · JWT · Bcrypt · Bootstrap · Mongoose

---

## Overview

This is a full-featured E-Commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The app allows users to browse products with filters, register/login, reset passwords, add products to cart, and perform checkout. It includes an admin panel for product, category, and order management.

---

## Features

- Product Listing with Category, Price & Search Filters
- Pagination & Load More functionality
- Add to Cart with Toast Notification
- User Authentication (Register, Login, Forgot/Reset Password)
- Password hashing with Bcrypt
- Checkout & Order Summary
- Admin Dashboard for Managing:
  - Products (Add/Edit/Delete)
  - Categories
  - Orders (Status Tracking: Processed, Delivered, Cancelled)
- Success/Error Feedback via Toasts
- RESTful APIs & JWT-based protected routes

---

## Demo

[Click here to watch the demo video](Demo/Video%20Demo.mp4)

---

## Tech Stack

| Category       | Technology                 |
| -------------- | -------------------------- |
| Frontend       | React.js, Bootstrap, Axios |
| Backend        | Node.js, Express.js        |
| Authentication | JWT, Bcrypt                |
| Database       | MongoDB, Mongoose          |
| Dev Tools      | VS Code, Postman, Nodemon  |

---

## Folder Structure

```
ecommerce-app/
├── client/                    # React frontend
│   ├── public/
│   │   ├── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Form/
│   │   │   |   ├── CategoryForm.js
│   │   │   |   ├── SearchInput.js
│   │   │   ├── Layout/
│   │   │   |   ├── AdminMenu.js
│   │   │   |   ├── Footer.js
│   │   │   |   ├── Header.js
│   │   │   |   ├── Layout.js
│   │   │   |   ├── UserMenu.js
│   │   │   ├── Routes/
│   │   │   |   ├── AdminRoute.js
│   │   │   |   ├── Private.js
│   │   │   ├── Prices.js
│   │   │   ├── Spinner.js
│   │   ├── context/
│   │   │   ├── auth.js
│   │   │   ├── cart.js
│   │   │   ├── search.js
│   │   ├── hooks/
│   │   │   ├── useCategory.js
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   |   ├── AdminDashboard.js
│   │   │   |   ├── CreateCategory.js
│   │   │   |   ├── CreateProduct.js
│   │   │   |   ├── Products.js
│   │   │   |   ├── UpdateProduct.js
│   │   │   |   ├── Users.js
│   │   │   ├── Auth/
│   │   │   |   ├── ForgotPassword.js
│   │   │   |   ├── Login.js
│   │   │   |   ├── Register.js
│   │   │   |   ├── ResetPassword.js
│   │   │   ├── user/
│   │   │   |   ├── Dashboard.js
│   │   │   |   ├── Orders.js
│   │   │   |   ├── Profile.js
│   │   │   ├── About.js
│   │   │   ├── CartPage.js
│   │   │   ├── Categories.js
│   │   │   ├── Category.js
│   │   │   ├── Contact.js
│   │   │   ├── HomePage.js
│   │   │   ├── PagenotFound.js
│   │   │   ├── Policy.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Search.js
│   │   ├── styles/
│   │   │   ├── About.css
│   │   │   ├── AdminDashboard.css
│   │   │   ├── AdminMenu.css
│   │   │   ├── CartPage.css
│   │   │   ├── CategoriesPage.css
│   │   │   ├── Category.css
│   │   │   ├── Contact.css
│   │   │   ├── CreateCategory.css
│   │   │   ├── CreateProduct.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Footer.css
│   │   │   ├── ForgotPassword.css
│   │   │   ├── Header.css
│   │   │   ├── HomePage.css
│   │   │   ├── Layout.css
│   │   │   ├── Login.css
│   │   │   ├── PageNotFound.css
│   │   │   ├── Policy.css
│   │   │   ├── ProductDetails.css
│   │   │   ├── Products.css
│   │   │   ├── ResetPassword.css
│   │   │   ├── Search.css
│   │   │   ├── SearchInput.css
│   │   │   ├── UpdateProducts.css
│   │   │   ├── UserMenu.css
│   │   │   ├── Users.css
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   └── .env
│   └── .gitignore
├── server/                    # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── helpers/
│   ├── server.js
│   └── .env
├── Demo/
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```

### 2. Setup Backend

```bash
cd server
npm install
npm run server  # or nodemon server.js
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm start
```

---

## API Endpoints (Backend)

| Method | Endpoint                             | Description                     |
| ------ | ------------------------------------ | ------------------------------- |
| POST   | `/auth/register`                     | Register new user               |
| POST   | `/auth/login`                        | Login user                      |
| POST   | `/auth/forgot-password`              | Forgot password                 |
| POST   | `/auth/reset-password`               | Reset password                  |
| PUT    | `/auth/profile`                      | Update Profile                  |
| POST   | `/product/create-product`            | Add a new product (Admin only)  |
| PUT    | `/product/update-product/:id`        | Update a product (Admin only)   |
| GET    | `/product/get-product`               | Get all products                |
| GET    | `/product/single-product/:slug`      | Get single product              |
| GET    | `/product/product-photo/:id`         | Get product photo               |
| DELETE | `/product/delete-product/:id`        | Delete a product (Admin only)   |
| POST   | `/product/product-filters`           | Filter Products                 |
| GET    | `/product/product-count`             | Get number of products          |
| GET    | `/product/product-list/:page`        | Get products per page           |
| GET    | `/product/search/:keyword`           | Search products                 |
| GET    | `/product/related-product/:pid/:cid` | Get similar products            |
| GET    | `/product//product-category/:slug`   | Get category wise products      |
| POST   | `/category/create-category`          | Add a new category (Admin only) |
| PUT    | `/category/update-category/:id`      | Update a category (Admin only)  |
| GET    | `/category/get-category`             | Get all categories              |
| GET    | `/category/single-category/:slug`    | Get single category             |
| DELETE | `/category/delete-category/:id`      | Delete a category (Admin only)  |
| GET    | `/user/get-users`                    | Get all users                   |

---

## Environment Variables

In `server/.env`:

```
PORT = 8000
MONGO_URL = your_mongodb_uri_here
JWT_SECRET = your_jwt_secret_key

# SMTP configuration for sending reset password emails
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your_email@gmail.com
SMTP_PASS = your_email_app_password

# Reset Password Token Settings
RESET_PASSWORD_SECRET = your_reset_secret_key
RESET_PASSWORD_EXPIRY = 1h
```

---
