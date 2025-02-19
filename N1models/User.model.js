// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Teacher', 'Parent', 'Principal', 'User', 'School'], required: true },
    profilePicture: { type: String },
    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// Index for email (unique) to optimize login and registration lookups
userSchema.index({ email: 1 }, { unique: true });

// Index for role to filter users by their roles
userSchema.index({ role: 1 });

// Index for name (optional, based on search frequency)
userSchema.index({ name: 1 });

const User = mongoose.model('User', userSchema);
export default User;

