import express from "express";

import { login, register } from "../controllers/auth";
import { loginValidation, registerValidation } from "../validations/auth";
import validate from "../middlewares/validate";

const router = express.Router();

router.post("/login", validate(loginValidation), login);
router.post("/register", validate(registerValidation), register);

export default router;
