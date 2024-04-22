import express from "express";
const router = express.Router();
// import Routes
import { userRegister, userLogin } from "../controllers/users.contollers.js";
router.post("/v1/register", userRegister);
router.post("/v1/login", userLogin);
// router.post("/v1/send:id",)
export default router;
