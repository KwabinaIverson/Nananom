# Nananom Farms Marketing Management System - Frontend

![Nananom Farms Logo Placeholder](https://via.placeholder.com/150/66BB6A/FFFFFF?text=NANANOM%20FARMS)

## Table of Contents

1.  [Introduction](#introduction)
2.  [Features](#features)
3.  [Technologies Used](#technologies-used)
4.  [Prerequisites](#prerequisites)
5.  [Installation Guide](#installation-guide)
6.  [Project Structure](#project-structure)
7.  [Usage](#usage)
8.  [Authentication & Roles](#authentication--roles)
9.  [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

---

## 1. Introduction

This repository contains the frontend application for the Nananom Farms Marketing Management System. It is a modern, responsive web application designed to streamline the farm's operations by providing distinct user interfaces for Administrators, Support Agents, and Customers. Built with React.js and styled with Tailwind CSS, it offers a dynamic and intuitive experience for managing services, users, appointments, and enquiries.

## 2. Features

* **Role-Based Dashboards:** Dedicated dashboards tailored for `Administrator`, `Support Agent`, and `Customer` roles, providing relevant information and quick access to functions.
* **User Authentication:** Secure login mechanism with role-based redirection.
* **Responsive UI:** Designed with Tailwind CSS to ensure a seamless experience across various devices (desktops, tablets, mobile phones).
* **Consistent Design Language:** Follows a "modern farm UI" aesthetic with earthy tones (greens, yellows, browns) and clean, card-based layouts.
* **Client-Side Routing:** Utilizes React Router DOM for efficient navigation between different application pages without full page reloads.
* **Mock Data Integration:** Currently uses mock data for dashboard displays, enabling frontend development independently of the backend.

## 3. Technologies Used

* **React.js:** A JavaScript library for building user interfaces.
* **React Router DOM:** For declarative routing in React applications.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
* **JavaScript (ES6+):** The core programming language.
* **Vite:** A fast build tool that provides a rapid development environment (implied if `npm create vite@latest` was used).

## 4. Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Node.js:** (LTS version recommended)
    * You can download it from [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager) or **Yarn** (comes with Node.js, or can be installed separately).

## 5. Installation Guide

Follow these steps to get the frontend application up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nananom-farms-frontend # or whatever your frontend directory is named
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    Using npm:
    ```bash
    npm run dev
    ```
    Or using Yarn:
    ```bash
    yarn dev
    ```

    The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## 6. Project Structure

The project follows a standard React application structure:

````

nananom-farms-frontend/
├── public/                \# Static assets (e.g., index.html, favicon)
├── src/
│   ├── assets/            \# Images, icons, fonts
│   ├── components/        \# Reusable UI components (e.g., Card, Sidebar)
│   ├── pages/             \# Main application pages (e.g., Login, Dashboard, NotFound)
│   │   ├── Auth/          \# Login and related authentication pages
│   │   ├── Dashboard/     \# Admin, Agent, Customer dashboards
│   │   └── ...
│   ├── services/          \# API calls, authentication logic (e.g., auth.js)
│   ├── routes/            \# Centralized route definitions (e.g., AppRoutes.jsx)
│   ├── App.jsx            \# Main application component
│   ├── main.jsx           \# Entry point for the React app
│   ├── index.css          \# Global CSS, TailwindCSS directives
│   └── tailwind.config.js \# Tailwind CSS configuration
├── .gitignore             \# Specifies intentionally untracked files to ignore
├── package.json           \# Project metadata and dependencies
├── postcss.config.js      \# PostCSS configuration for TailwindCSS
└── README.md              \# This file

```

## 7. Usage

Upon starting the application, you will be redirected to the login page.
The application currently uses `localStorage` for basic role simulation after "login".

You can simulate logging in as different roles to view their respective dashboards:

* **Admin Dashboard:** Accessible after simulating an Admin login.
* **Agent Dashboard:** Accessible after simulating a Support Agent login.
* **Customer Dashboard:** Accessible after simulating a Customer login.

Navigate through the sidebar links (where available) or utilize the main dashboard content to see the mock data and layout for each role.

## 8. Authentication & Roles (Frontend Simulation)

For demonstration purposes, the frontend's `src/services/auth.js` contains functions (`loginUser`, `getUserRole`, `getToken`, `logoutUser`) that simulate authentication by storing and retrieving role information and a dummy token in `localStorage`.

* **`loginUser(username, password, role)`:** A placeholder function that would typically make an API call. Currently, it just sets a dummy token and the `role` in `localStorage`.
    * You can conceptually "login" by calling `loginUser('admin', 'pass', 'admin')` or `loginUser('agent', 'pass', 'agent')` etc., or use the provided login form.
* **`getUserRole()`:** Retrieves the simulated user role from `localStorage`.
* **`getToken()`:** Retrieves the simulated token from `localStorage`.

In a production environment, these functions would interact with the actual backend API for secure authentication using JWTs.

## 9. Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature X'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a Pull Request.

Please ensure your code adheres to the existing coding style and includes appropriate documentation and tests (if applicable).

## 10. License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 11. Contact

For questions, suggestions, or support, please open an issue in this repository or contact:

* **Project Maintainer:** [Your Name/Team Name]
* **Email:** [Your Email Address] (e.g., info@nananomfarms.com)

---
