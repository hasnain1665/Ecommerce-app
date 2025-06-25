import userModel from "../models/userModel.js";
import { comparepassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
import { sendResetPasswordEmail } from "../utils/emailService.js";

// User Registration
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // Validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone Number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, please login",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// User Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validations
    if (!email) {
      return res.status(404).send({ error: "Email is Required" });
    }
    if (!password) {
      return res.status(404).send({ error: "Password is Required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email is not registered" });
    }
    // password matching
    const match = await comparepassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid Password" });
    }
    // JWT generation
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful. Welcome back!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
    });
  }
};

// Forgot Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(404)
        .send({ success: false, error: "Email is Required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email is not registered" });
    }

    // Create token
    const resetToken = JWT.sign(
      { id: user.id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: process.env.RESET_PASSWORD_EXPIRY }
    );

    // Send email with token (not as link)
    await sendResetPasswordEmail(email, resetToken);
    res.status(200).send({
      success: true,
      message: "Password reset token sent to your email.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

// Reset Password
export const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;
    // validations
    if (!password) {
      return res
        .status(404)
        .send({ success: false, error: "Password is Required" });
    }
    if (!token) {
      return res
        .status(404)
        .send({ success: false, error: "Token is Required" });
    }

    // Verify token
    let payload;
    try {
      payload = JWT.verify(token, process.env.RESET_PASSWORD_SECRET);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });
    }

    const user = await userModel.findById(payload.id);
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    // Update password
    user.password = await hashPassword(password);
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
    });
  }
};
