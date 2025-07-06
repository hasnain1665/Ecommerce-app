import mongoose from "mongoose";
import userModel from "../models/userModel.js";

// Get All Users
export const getUserController = async (req, res) => {
  try {
    const users = await userModel.find({});

    res.status(201).send({
      success: true,
      message: "All Users Retreived Successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting All Users",
    });
  }
};
