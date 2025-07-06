import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { getUserController } from "../controllers/userController.js";

// router object
const router = express.Router();
// GET PRODUCTS || METHOD: GET
router.get("/get-users", getUserController);

export default router;
