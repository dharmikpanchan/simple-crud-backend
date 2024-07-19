import UserModel from '../models/userModel.js';
import { generateToken } from '../services/Jwt.js';

// Add user

export const addUser = async (req, res) => {
  try {

    const { name, mobileNumber, email, password, userType, image } = req.body;
    console.log("dcsdc", image)
    // Check if the email or mobileNumber already exists
    const [existingUserEmail, existingUserNumber] = await Promise.all([
      UserModel.findOne({ email }),
      UserModel.findOne({ mobileNumber }),
    ]);

    if (existingUserEmail || existingUserNumber) {
      const errors = [];
      if (existingUserEmail) errors.push('email');
      if (existingUserNumber) errors.push('mobileNumber');

      return res.status(400).json({ error: `User with this ${errors.join(' and ')} already exists` });
    }

    // If email and mobileNumber are not found, proceed to create a new user
    const userData = { name, mobileNumber, email, password, userType, image };
    const user = new UserModel(userData);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get edit user Details
export const editUserDetails = async (req, res) => {
  try {
    const { id } = req.query; // Change from req.params to req.query
    const users = await UserModel.findById(id);

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    //  const { id } = req.query;
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user by ID
export const editUser = async (req, res) => {
  console.log("call",req.body)
  try {
    const { id } = req.params;
    let user = await UserModel.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct (you might want to use bcrypt or another library for secure password handling)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // User is authenticated, generate a token
    let payload = {
      id: user._id,
      userType: user.userType
    }
    let option = {
      expiresIn: 100
    }
    const token = generateToken(payload, option);
    res.status(200).json({ message: "login sucessfully", token: token, ...user._doc }); // expiresIn is in seconds

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


