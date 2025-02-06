import { handleUserSignUp, handleUserLogIn } from "../controller/user.js";
import express from "express";

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogIn);


export default router;
