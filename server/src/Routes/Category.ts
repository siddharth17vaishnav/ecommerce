import express from "express";
import { categories ,addCategory} from "../Controller/Category";

const router = express.Router();

router.get("/category",categories) ;
router.post("/category",addCategory) ;

export { router as CategoryRouter };
