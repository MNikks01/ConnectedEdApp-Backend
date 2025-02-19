# ConnectedApp

A comprehensive REST API for managing school operations, built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-based Access Control (Admin, Principal, Teachers, Students, Parents)
- 🏫 School Management
- 👨‍🏫 Teacher & Class Teacher Management
- 👨‍🎓 Student Management
- 👨‍👩‍👧‍👦 Parent Management
- 📚 Project Management
- 📅 Timetable System
- 📝 Leave Application System
- 📢 Notice Board & Events
- 💬 Chat System
- 👥 Group Management
- 📫 Notification System
- 📊 Feedback System

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for Authentication
- Bcrypt for Password Hashing
- Cloudinary for File Storage
- Socket.io for Real-time Features

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
   git clone https://github.com/yourusername/connectedapp.git
   cd connectedapp

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users

- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `POST /api/users` - Create new user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password

## Project Structure

```
connectedapp/
├── config/
│   ├── config.js
│   └── database.js
├── controllers/
│   ├── userController.js
│   └── ...
├── middleware/
│   ├── auth.middleware.js
│   ├── validation.middleware.js
│   └── role.middleware.js
├── models/
│   ├── User.js
│   └── ...
├── routes/
│   ├── user.routes.js
│   └── ...
├── utils/
│   └── error.js
├── .env
├── .gitignore
├── app.js
└── package.json
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details"
  }
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
