import express, { Router } from "express";
const router: Router = express.Router();

// import Routes
import {
  userRegister,
  userLogin,
  getOtherUsers,
  logout,
} from "../controllers/users.contollers.js";
import isAuthencticate from "../utils/isAuthencticate.js";
import sendMessages from "../controllers/messages.controllers.js";

router.post("/v1/register", userRegister);
router.post("/v1/login", userLogin);
router.get("/v1/logout", logout);
router.get("/v2/otherusers", isAuthencticate, getOtherUsers);
router.post("/v2/send/:id", isAuthencticate, sendMessages);

export default router;
