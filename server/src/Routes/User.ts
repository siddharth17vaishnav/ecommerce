import express from "express";
import { users, register } from "../Controller/User";

const router = express.Router();

router.get("/users", users);
router.post("/register", register);

export { router as UserRouter };
