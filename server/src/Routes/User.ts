import express from "express";
import { users, register, login } from "../Controller/User";

const router = express.Router();

router.get("/users", users);
router.post("/register", register);
router.post("/login", login);

export { router as UserRouter };
