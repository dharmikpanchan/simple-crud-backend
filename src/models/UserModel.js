// src/models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  image: {
    type: [String], // Assuming you store image URLs or paths
    default: [],   // Initialize as an empty array
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;