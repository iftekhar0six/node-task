
---

# Node.js Developer Assessment

## Project Overview

This project implements a **Node.js API** with **CRUD operations** and **user/admin validation**. It includes functionality for **user/admin login**, **registration**, **listing**, **searching**, and **filtering**.

---

## Setup Instructions

### 1. Install Dependencies

To get started, run the following command to install all necessary dependencies:

```bash
npm install
```

### 2. Database Setup

This project uses **MongoDB** as the database. You can either set up MongoDB locally or use **MongoDB Atlas** for cloud hosting.

#### Option 1: Local MongoDB Setup (Recommended)

1. Install MongoDB on your local machine.
2. Start the MongoDB service on your system.

#### Option 2: MongoDB Atlas Setup

1. Sign up for **MongoDB Atlas** if you don’t have an account already:  
   [MongoDB Atlas Registration](https://www.mongodb.com/cloud/atlas/register)
   
2. After signing up, create a new cluster in **MongoDB Atlas** and obtain the **connection URI** for your database.

3. Replace the URI in the `.env` file or your configuration file with the connection string from MongoDB Atlas, like so:

```bash
mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

### 3. Start the Project

To run the project, use the following command:

```bash
npm start
```

Once the server is running, two key links will be provided:

- **Server URL**: `http://127.0.0.1:8080`
- **Swagger UI URL**: `http://127.0.0.1:8080/api-docs`

### 4. API Testing

There are two ways to test the API endpoints:

#### Option 1: Swagger UI (Recommended)

Swagger UI is integrated into the project for easy, interactive testing. Visit the following URL to explore all available endpoints, view request/response models, and make API requests directly:

- **Swagger UI**: `http://127.0.0.1:8080/api-docs`

#### Option 2: Postman Collection

A **Postman collection** file (`Node-Task.postman_collection.json`) is provided. You can import this file into **Postman** to test the API endpoints interactively.

---

## Validation and Error Handling

- **Input Validation**: Every field is validated to ensure correct data format.
- **Error Handling**: Meaningful error messages are returned for invalid requests to guide the user in fixing the issue.

---

## Contact Information

If you have any questions or feedback, feel free to reach out:

- **Email**: [iftekhar0six@gmail.com](mailto:iftekhar0six@gmail.com)
- **Phone**: +91 94088 96800

Thank you for reviewing the project!

---
