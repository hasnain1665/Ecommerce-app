import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// configure env
dotenv.config();

// database config
connectDB();

// rest app
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce app",
  });
});

// PORT
const PORT = process.env.PORT;

// run
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}.`);
});
