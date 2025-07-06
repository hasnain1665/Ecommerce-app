import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD: POST
router.post("/register", registerController);
// LOGIN || METHOD: POST
router.post("/login", loginController);
// FORGOT PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);
// RESET PASSWORD || POST
router.post("/reset-password", resetPasswordController);
// Protected User Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// Protected Admin Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update Profile
router.put("/profile",requireSignIn, updateProfileController)


export default router;
