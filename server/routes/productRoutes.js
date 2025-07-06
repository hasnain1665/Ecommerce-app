import express from "express";
import {
  createProductController,
  getProductController,
  singleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import ExpressFormidable from "express-formidable";

// router object
const router = express.Router();

//Routes
// CREATE PRODUCT || METHOD: POST
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// UPDATE PRODUCT || METHOD: PUT
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

// GET PRODUCTS || METHOD: GET
router.get("/get-product", getProductController);

// GET SINGLE PRODUCT || METHOD: GET
router.get("/single-product/:slug", singleProductController);

// GET PRODUCT PHOTO || METHOD: GET
router.get("/product-photo/:pid", productPhotoController);

// DELETE PRODUCT || METHOD: DELETE
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// FILTER PRODUCT || METHOD: POST
router.post("/product-filters", productFiltersController);

// PRODUCT COUNT || METHOD GET
router.get("/product-count", productCountController);

// PRODCTS PER PAGE / METHOD GET
router.get("/product-list/:page", productListController);

// SEARCH PRODUCT / METHOD GET
router.get("/search/:keyword", searchProductController);

// SIMILAR PRODUCTS / METHOD GET
router.get("/related-product/:pid/:cid", relatedProductController);

// CATEGORY WISE PRODUCT/ METHOD GET
router.get("/product-category/:slug", productCategoryController);

export default router;
