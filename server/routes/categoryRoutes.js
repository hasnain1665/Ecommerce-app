import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  CategoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";
// router object
const router = express.Router();

//Routes
// CREATE CATEGORY || METHOD: POST
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// UPDATE CATEGORY || METHOD: PUT
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// GET ALL CATEGORY || METHOD: GET
router.get("/get-category", CategoryController);

// GET SINGLE CATEGORY || METHOD: GET
router.get("/single-category/:slug", singleCategoryController);

// DELETE CATEGORY || METHOD: DELETE
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
