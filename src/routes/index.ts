import { Router } from "express";
import * as auth from "./auth";
const router = Router();

auth.login(router);
auth.register(router);
auth.googleAuth(router);

export default router;
