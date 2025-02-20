# ConnectedApp

ConnectEdApp is an incredibly useful and easy to use E-Schooling platform with goal to connect all educations.

Inspiration:
At the end of the day, the most overwhelming key to child’s success is positive involvement of parents. -Jane D. Hull

ConnectEdApp Features include:

- Projects & Homeworks(Teachers can update, Parents/Students/Principal/Schools can read.)
- Noticeboard(Schools can update, Parents/Students/Principal/Teachers can read.)
- Find School's upcoming Events
- Communicate with schools and teachers through messages.
- Visit School's profile to see information like school's vision, mission, contact details, address, infrastructure, facilities, other basic information as well as achievements of school and list of teachers(click on name to visit teachers profile), etc.
- Visit teachers profile to know information like subjects they teach at their school, their educational qualification, their awards & achievements, etc.
- Follow schools and teachers to see their posts in your feed.
- Customize your profile, add a profile picture, bio, update posts etc.

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
- Apollo Server for GraphQL
- Mongoose for MongoDB Object Modeling
- Cors for Cross-Origin Resource Sharing
- Multer for File Uploads
- Socket.io for Real-time Communication

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
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your_database

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_EXPIRES_IN=30d
JWT_ACCESS_EXPIRES_IN=15m

# Cloudinary Configuration (for media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

# Other Configuration
GRAPHQL_PATH=/graphql
FRONTEND_URL=http://localhost:3000

# OAuth (if using social login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# New additions
CORS_ORIGIN=http://localhost:3000
EMAIL_SERVICE=gmail
EMAIL_PASSWORD=your_app_specific_password

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

### Feedback

- `POST /api/feedback` - Create new feedback
- `GET /api/feedback` - Get all feedback (Admin)
- `GET /api/feedback/:id` - Get feedback by ID (Admin)
- `PUT /api/feedback/:id` - Update feedback (Admin)
- `DELETE /api/feedback/:id` - Delete feedback (Admin)

### Notifications

- `POST /api/notifications` - Create new notification
- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/:id` - Get notification by ID
- `PUT /api/notifications/:id` - Update notification
- `DELETE /api/notifications/:id` - Delete notification

### Posts

- `POST /api/posts` - Create new post
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like a post

### Projects and Homework

- `POST /api/projects-and-homeworks` - Create new project or homework
- `GET /api/projects-and-homeworks` - Get all projects and homeworks
- `GET /api/projects-and-homeworks/:id` - Get project or homework by ID
- `PUT /api/projects-and-homeworks/:id` - Update project or homework
- `DELETE /api/projects-and-homeworks/:id` - Delete project or homework

### Polls

- `POST /api/polls` - Create new poll
- `GET /api/polls` - Get all polls
- `GET /api/polls/:id` - Get poll by ID
- `PUT /api/polls/:id` - Update poll
- `DELETE /api/polls/:id` - Delete poll
- `POST /api/polls/:id/vote` - Vote on a poll

### Syllabuses

- `POST /api/syllabuses` - Create new syllabus
- `GET /api/syllabuses` - Get all syllabuses
- `GET /api/syllabuses/:id` - Get syllabus by ID
- `PUT /api/syllabuses/:id` - Update syllabus
- `DELETE /api/syllabuses/:id` - Delete syllabus

### Social

- `POST /api/social/follow/:userId` - Follow a user
- `POST /api/social/unfollow/:userId` - Unfollow a user
- `GET /api/social/followers/:userId` - Get user's followers
- `GET /api/social/following/:userId` - Get user's following
- `GET /api/social/friends` - Get friends list

## Project Structure

```
connectedapp/
├── config/
│   ├── config.js
│   └── database.js
├── controllers/
│   ├── notification.controller.js
│   ├── poll.controller.js
│   ├── post.controller.js
│   ├── projectAndHomework.controller.js
│   ├── syllabus.controller.js
│   ├── social.controller.js
│   └── user.controller.js
│   └── ...
├── middleware/
│   ├── validation.middleware.js
│   └── role.middleware.js
│   ├── cors.middleware.js
│   ├── error.middleware.js
│   └── auth.middleware.js
├── models/
│   ├── User.js
│   ├── Feedback.js
│   ├── Answer.js
│   ├── ProjectAndHomework.js
│   ├── Syllabus.js
│   ├── User.js
│   ├── Notification.js
│   ├── Poll.js
│   ├── Post.js
│   └── Social.js
│   └── ...
├── routes/
│   ├── notification.routes.js
│   ├── poll.routes.js
│   ├── post.routes.js
│   ├── projectAndHomework.routes.js
│   ├── syllabus.routes.js
│   ├── social.routes.js
│   └── user.routes.js
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
