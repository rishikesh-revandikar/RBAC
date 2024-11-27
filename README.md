# VRV Security RBAC Dashboard

## 🌟 Project Overview

### Project Description

This Role-Based Access Control (RBAC) Dashboard is a comprehensive user and role management application designed to provide granular access control and user management capabilities.

## 🚀 Features

### User Management

-   Create, read, update, and delete users
-   Assign roles to users
-   Filter and search users
-   Manage user status (Active/Inactive)

### Role Management

-   Create and manage roles with detailed permissions
-   Granular permission matrix
-   Dynamic role assignment
-   Comprehensive permission control

### Dashboard

-   Overview of system users and roles
-   Quick access to key actions
-   Visual representation of user and role distributions

## 🛠 Tech Stack

-   **Frontend**: React.js
-   **UI Library**: Shadcn UI
-   **State Management**: React Hooks
-   **Form Handling**: React Hook Form
-   **Validation**: Zod
-   **Styling**: Tailwind CSS
-   **Visualization Library**: Recharts
-   **Mock Data Management**: Custom mock API service

## 📦 Prerequisites

-   Node.js (v16 or later)
-   npm (v8 or later)

## 🔧 Run Locally

Clone the project

```bash
  git clone https://github.com/rishikesh-revandikar/RBAC.git
```

Go to the project directory

```bash
  cd RBAC
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## ✨ Features Explanation

### 1. Dashboard Overview
The dashboard provides a high-level overview of the system, enabling administrators to quickly understand the state of users and roles. Key features include:
- **User Statistics**: Displays the total number of users, active roles, and assigned permissions.
- **Role Distribution Chart**: Visualize the distribution of users across different roles using a bar chart.
- **Recent Activity Log**: View the most recent user and role-related actions (e.g., user creation, role updates).
- **Quick Actions**: Shortcut buttons to perform common tasks like adding users, creating roles, and managing permissions.

---

### 2. User Management
Manage users efficiently with a user-friendly interface that includes the following capabilities:
- **User Listing**: 
  - View a paginated list of all users in the system.
  - Display key details such as name, email, role, and status (Active/Inactive).
- **CRUD Operations**:
  - **Create**: Add a new user by entering their details (name, email, role, and status).
  - **Read**: View detailed information about a specific user.
  - **Update**: Modify user details, including their role and status.
  - **Delete**: Remove a user from the system with a confirmation dialog to prevent accidental deletions.
- **Search and Filter**:
  - Search for users by name or email.
  - Filter users by their role or status (e.g., Active or Inactive).
- **Role Assignment**:
  - Dynamically assign or update a user's role.
  - Automatically fetch available roles from the system.

---

### 3. Role Management
Manage roles and permissions with a comprehensive role management system:
- **Role Listing**:
  - View a list of all roles in the system, along with their descriptions and assigned permissions.
- **CRUD Operations**:
  - **Create**: Add a new role with a custom name, description, and associated permissions.
  - **Read**: View details about a specific role, including its description and permissions.
  - **Update**: Modify a role's name, description, and permissions.
  - **Delete**: Remove a role from the system with confirmation to prevent accidental deletions.
- **Permissions Matrix**:
  - Assign granular permissions to roles using a user-friendly matrix.
  - Permissions are categorized by functionality (e.g., User Management, Role Management, Dashboard Access).
  - Add or remove permissions with a single click.
- **Search and Filter**:
  - Search for roles by name.
  - Filter roles by associated permissions.

---

### 4. Permission Management
Control access to system functionalities through a detailed permission management system:
- **Granular Permissions**:
  - Fine-tune permissions for each role, such as the ability to view, create, edit, or delete users and roles.
  - Assign dashboard-specific permissions (e.g., analytics access).
- **Permission Categories**:
  - Permissions are grouped into categories for better organization (e.g., User Management, Role Management, Dashboard).
- **Dynamic Updates**:
  - Role permissions are updated dynamically when changes are made, ensuring real-time sync with the system.

---

### 5. Search and Filtering
Efficiently navigate large datasets with robust search and filtering functionalities:
- **Global Search**:
  - Search across users and roles for quick access to specific entities.
- **Role-Based Filtering**:
  - Filter users by their assigned roles.
- **Permission-Based Filtering**:
  - Filter roles by their associated permissions.
- **Status-Based Filtering**:
  - Filter users by their status (Active/Inactive).

---

### 6. Notifications and Feedback
Receive real-time feedback for system actions:
- **Toast Notifications**:
  - Informative notifications for success, error, and pending actions.
  - Example: “User created successfully” or “Failed to update role.”
- **Validation Feedback**:
  - Inline form validation for user-friendly error handling.
  - Example: “Name must be at least 2 characters” or “Invalid email format.”

---

### 7. Responsive Layouts
The system is fully optimized for various screen sizes, ensuring a seamless experience across devices:
- **Desktop**: Full-featured UI with access to all functionalities.
- **Tablet and Mobile**: Responsive layouts with collapsible sidebars and optimized navigation.

---

### 8. Dynamic Role and Permission Updates
- Role and permission updates are dynamically reflected in the system.
- Example: Adding a new role updates the available role options in the User Management page.

---

### 9. Secure and Robust
- **Role-Based Access Control**:
  - Ensure users only have access to the features and data they are authorized for.
- **Validation**:
  - Protect data integrity with client-side input validation using Zod.
- **Confirmation Dialogs**:
  - Prevent accidental deletions or changes with confirmation modals.

---
