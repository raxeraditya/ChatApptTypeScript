import express, { Router, Request, Response, NextFunction } from "express";
const router: Router = express.Router();
// import Routes
import {
  userRegister,
  userLogin,
  getOtherUsers,
  logout,
} from "../controllers/users.contollers.js";
import { isAuthencticate } from "../utils/isAuthencticate.js";
import sendMessages from "../controllers/messages.controllers.js";
import { AuthRequest } from "../utils/isAuthencticate.js";

// Register routes with proper handling of request/response
router.post("/v1/register", (req: Request, res: Response) => {
  userRegister(req, res);
});

router.post("/v1/login", (req: Request, res: Response) => {
  userLogin(req as AuthRequest, res);
});

router.get("/v1/logout", (req: Request, res: Response) => {
  logout(req, res);
});

router.get("/v2/otherusers", isAuthencticate, (req: Request, res: Response, next: NextFunction) => {
  getOtherUsers(req as AuthRequest, res, next);
});

router.post("/v2/send/:id", isAuthencticate, (req: Request, res: Response, next: NextFunction) => {
  sendMessages(req as AuthRequest, res, next);
});

export default router;