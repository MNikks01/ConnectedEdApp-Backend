# TASKS

# Social Tasks for users

1. User Authentication and Profile Management [USER]
   - Sign up/Registration: Creating a new account with email-password, phone number.
   - Types of accounts/users : students, teachers, principals, parents, schools, normal users (only use social network)
   - Login/Logout: Logging in with credentials or social accounts.
   - Forgot Password/Reset Password: Recovering and updating passwords.
   - Profile Creation: Adding details like name, bio, profile picture, and location.
   - Profile Editing: Updating personal information.
   - Account Deactivation/Deletion: Temporarily disabling or permanently deleting accounts.
2. Social Networking and User Interaction [FRIEND_REQUEST] [FOLLOW/UNFOLLOW] [MESSAGES] [NOTIFICATIONS]
   - Friend Requests/Follow System: Sending, accepting and rejecting friend requests or following and unfollowing users.
     schools can not send or recieve friend requests. but others can follow schools and vice-a-versa
   - Messaging: Sending direct messages, group chats, and real-time chat features.
     school are not involved in group chats.
   - Notifications: Receiving updates for likes, comments, friend requests, etc.
   - Tags and Mentions: Tagging other users in posts and comments.
3. Content Creation and Sharing [POSTS]
   - Posting Content: Text, images, videos, or other media.
   - Editing/Deleting Posts: Modifying or removing posts.
   - Media Upload: Uploading images, videos, and files.
   - Sharing/Resharing Posts: Sharing content from other users.
4. Engagement and Interactions [LIKES] [COMMENTS] [POLLS]
   - Likes: Reacting to posts or comments.
   - Comments/Replies: Adding comments or replying to comments.
   - Polls and Surveys: schools can Create polls and all other users can participate in it.
5. Content Browsing and Search
   - News Feed/Timeline: Browsing posts from friends and followed users.
   - Search: Finding users or groups.
6. Groups and Communities [GROUP/COMMUNITY]
   - Creating Groups/Communities: Forming interest-based groups. schols can not be added in groups created by other users.
   - Joining/Leaving Groups: Becoming a member of a group or leaving it.
   - Group Management: Admin features like approving members, deleting posts, etc.
7. Privacy and Security
   - Block/Report Users: Blocking unwanted users from messaging, following and sending friend requests.
   - Content Visibility Settings: Choosing who can see posts (public, friends, private).
   - Account Security: Two-factor authentication.
8. Analytics and Insights
   - Profile Views: Viewing who visited the user profile.
   - schools can view multiple analytics like daily, monthly visitors, users from different geographical locations etc, post views and other analytics.

# e-Schooling Tasks

1. schools

   - schools can read syllabus covered of all the subects of all the classess
   - schools can read feedback of all the parents and students in school
   - schools can read LEAVE_APPLICATIONS of all the classes students and parents
   - schools can read homeworks of all the subjects of all the classes
   - schools can create/update/delete timetable(images) [TIMETABLES]
   - schools can create/update/delete notices [NOTICES]
   - schools can create/update/delete events [EVENTS]
   - schools can approve the requests for verifications of
     --> teacher for a specific subject
     --> principal for being principal
     --> student for being student
     --> parent for being parent of a specific student of a particular class

2. teachers

   - teachers can add/update/delete homeworks of the subjects they are approved of by school [HOMEWORKS]
   - teachers can add/update/delete sullabus covered of the subjects they are approved of by school [SYLLABUS_COVERED]
   - teachers can read all notices
   - teachers can read all the events
   - teachers can read homeworks of the subjects they are approved of by school
   - teachers can read timetable(images) of all the classess

3. parents

   - parents can create/update/delete leave applications [LEAVE_APPLICATIONS]
   - parents can create/update/delete feedback [FEEDBACK]
   - parents can read all notices
   - parents can read all the events
   - parents can read the homeworks of a particular student
   - parents can read the notices of a particular student
   - parents can read the timetable of a particular student

4. students

   - students can create/update/delete feedback
   - students can read all notices
   - students can read all the events
   - parents can read the notices
   - parents can read the timetable

5. other users (use social network only)

6. Principals

   - principals can read syllabus covered of all the subects of all the classess
   - principals can read feedback of all the parents and students in school
   - principals can read LEAVE_APPLICATIONS of all the classes students and parents
   - principals can read homeworks of all the subjects of all the classes
   - principals can read timetable(images) of all the classess
   - principals can read all notices
   - principals can read all the events

7. Students
   a. Account Management
   - Sign up/Registration: Creating a student account.
   - Login/Logout: Accessing the platform with credentials.
   - Profile Management: Updating personal information like name, photo, grade, and contact details.
     b. Learning and Course Engagement
     - Accessing Courses: Viewing course materials and lessons.
     - Attending Live Classes: Joining virtual classrooms through video conferencing.
     - Downloading Study Materials: Accessing PDFs, videos, and other resources.
     - Watching Recorded Sessions: Viewing past lectures or recorded content.
     - Completing Assignments: Uploading homework and project submissions.
     - Taking Quizzes and Exams: Participating in assessments with auto-grading features.
     - Receiving Grades and Feedback: Viewing scores and teacher comments.
       c. Social and Collaborative Learning
       - Participating in Discussions: Commenting in forums or course discussion boards.
       - Group Projects: Collaborating with other students on team assignments.
       - Messaging: Sending messages to peers or instructors.
         d. Progress Tracking
         - Viewing Progress Reports: Checking grades, attendance, and course completion status.
         - Receiving Notifications: Alerts for upcoming deadlines, exams, or announcements.
8. Teachers
   a. Account and Profile Management
   - Creating and Managing a Profile: Adding qualifications, photo, and contact information.
     b. Course Management
     - Creating Courses: Uploading lessons, videos, and reading materials.
       - Assigning Homework/Assignments: Distributing tasks to students.
       - Setting Exams and Quizzes: Creating assessments with multiple question types.
       - Live Class Management: Scheduling and hosting live classes.
         c. Student Interaction
         - Grading and Feedback: Reviewing assignments and providing feedback.
         - Answering Queries: Responding to student questions on forums or chat.
           d. Progress and Performance Monitoring
         - Tracking Student Performance: Viewing detailed analytics for individual or group performance.
         - Attendance Management: Marking or reviewing student attendance.
9. Parents
   a. Account and Profile Management
   - Creating Parent Accounts: Linking profiles with students.
     b. Monitoring Student Activity
   - Viewing Grades and Reports: Checking student academic progress.
   - Attendance Monitoring: Viewing attendance records.
   - Reviewing Assignments: Seeing submitted and pending assignments.
     c. Communication
   - Messaging Teachers: Direct communication for updates or queries.
   - Receiving Notifications: Alerts on important updates like meetings or grades.
10. Administrators
    a. User Management
    - Managing User Roles: Adding or modifying students, teachers, and parents.
    - Approving Registrations: Verifying and approving new users.
      b. Course and Content Management
    - Approving Courses: Reviewing and publishing courses created by teachers.
    - Uploading Resources: Providing supplemental materials like e-books or guidelines.
      c. System Management
    - Managing Live Class Schedules: Overseeing class schedules and events.
    - Payment Processing: Managing fees and payment-related activities.
      d. Reports and Analytics
    - Generating Performance Reports: Detailed data on student, teacher, and overall platform performance.
    - System Logs and Activity Reports: Monitoring website usage and resolving issues.

### Models

- USER
- FRIEND_REQUEST
- FOLLOW/UNFOLLOW
- MESSAGES
- NOTIFICATIONS
- POSTS
- LIKES
- COMMENTS
- POLLS
- GROUP/COMMUNITY
- TIMETABLES
- NOTICES
- EVENTS
- HOMEWORKS
- SYLLABUS_COVERED
- LEAVE_APPLICATIONS
- FEEDBACK

### Controllers

### routes

### validations

### middlewares

### configs

### constants

### graphql

### utils
