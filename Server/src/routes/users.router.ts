import express, { Router } from "express";
const router: Router = express.Router();

// import Routes
import { userRegister, userLogin } from "../controllers/users.contollers.js";

router.post("/v1/register", userRegister);
router.post("/v1/login", userLogin);
// router.post("/v1/send:id",)

export default router;
