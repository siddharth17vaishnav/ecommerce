import express from "express";
import {
  categories,
  addCategory,
  deleteCategory,
} from "../Controller/Category";

const router = express.Router();

router.get("/category", categories);
router.delete("/category", deleteCategory);
router.post("/category", addCategory);

export { router as CategoryRouter };
