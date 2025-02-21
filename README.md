# ConnectedApp

ConnectEdApp is an incredibly useful and easy to use E-Schooling platform with goal to connect all educations.

Inspiration:
`At the end of the day, the most overwhelming key to child's success is positive involvement of parents. -Jane D. Hull`

ConnectEdApp Features include:

- `Projects & Homeworks`(Teachers can update, Parents/Students/Principal/Schools can read.)
- `Noticeboard`(Schools can update, Parents/Students/Principal/Teachers can read.)
- Find `School's upcoming Events`
- Communicate with schools and teachers through `messages`.
- Visit `School's profile` to see information like `school's vision, mission, contact details, address, infrastructure, facilities,` other basic information as well as `achievements of school` and `list of teachers`(click on name to visit teachers profile), etc.
- Visit `teachers profile` to know information like subjects they teach at their school, their educational qualification, their awards & achievements, etc.
- `Follow schools and teachers` to see their posts in your feed.
- `Customize your profile`, add a profile picture, bio, update posts etc.

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

<!-- ## GraphQL API

### Endpoints

- **GraphQL Endpoint**: `/graphql`

### Queries

- `getAllPosts`: Fetch all posts.
- `getPostById(id: ID!)`: Fetch a post by its ID.
- `getAllSyllabuses`: Fetch all syllabuses.
- `getSyllabusById(id: ID!)`: Fetch a syllabus by its ID.
- `getAllFriendRequests`: Fetch all pending friend requests.

### Mutations

- `createPost(caption: String!, files: [String])`: Create a new post.
- `updatePost(id: ID!, caption: String, files: [String])`: Update an existing post.
- `deletePost(id: ID!)`: Delete a post.
- `createSyllabus(...)`: Create a new syllabus.
- `updateSyllabus(id: ID!, ...)`: Update an existing syllabus.
- `deleteSyllabus(id: ID!)`: Delete a syllabus.
- `sendFriendRequest(userId: ID!)`: Send a friend request.
- `acceptFriendRequest(requestId: ID!)`: Accept a friend request.
- `rejectFriendRequest(requestId: ID!)`: Reject a friend request.
- `cancelFriendRequest(userId: ID!)`: Cancel a friend request. -->

<!-- ## REST API Endpoints

### User Management

- `POST /api/user`: Create a new user.
- `GET /api/user/:id`: Get user details by ID.
- `PUT /api/user/:id`: Update user details.
- `DELETE /api/user/:id`: Delete a user.

### Social Features

- `POST /api/social/follow/:userId`: Follow a user.
- `POST /api/social/unfollow/:userId`: Unfollow a user.
- `GET /api/social/followers/:userId`: Get user's followers.
- `GET /api/social/following/:userId`: Get user's following.

### Chat and Messaging

- `GET /api/chats`: Get all chats.
- `POST /api/messages`: Send a message.
- `GET /api/messages/:chatId`: Get messages in a chat.

### Events and Notifications

- `GET /api/events`: Get all events.
- `POST /api/notifications`: Create a new notification.
- `GET /api/notifications`: Get all notifications.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/connectedapp.git
   cd connectedapp
   ```

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
   ```

4. Start the server

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ``` -->

<!-- ## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. -->

## Project Structure

`connectedapp/
├── config/
│ ├── config.js
│ └── database.js
├── controllers/
│ ├── notification.controller.js
│ ├── poll.controller.js
│ ├── post.controller.js
│ └── ...
graphql/
├── schemas/
│ ├── authSchema.js
│ ├── index.js
│ ├── userSchema.js
│ └── ...
├── resolvers/
│ ├── authResolver.js
│ ├── userResolvers.js
│ ├── index.js
│ ├── schoolResolvers.js
│ └── ...
| ├── index.js
| ├── context.js
├── middleware/
│ ├── cors.middleware.js
│ ├── error.middleware.js
│ └── auth.middleware.js
│ └── ...
├── models/
│ ├── User.js
│ ├── Feedback.js
│ ├── Answer.js
│ ├── ProjectAndHomework.js
│ └── ...
├── routes/
│ ├── notification.routes.js
│ ├── poll.routes.js
│ ├── post.routes.js
│ └── ...
├── utils/
│ └── error.js
├── .env
├── .gitignore
├── app.js
└── package.json`
