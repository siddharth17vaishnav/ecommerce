import express from "express";
import { users, register, login,updateUser,deleteUser } from "../Controller/User";

const router = express.Router();

router.get("/users", users);
router.delete("/users", deleteUser);
router.put("/users", updateUser);
router.post("/register", register);
router.post("/login", login);


export { router as UserRouter };
