import { Router } from "express";

import authRouter from "./authRouter.js";
import credentialRouter from "./credentialRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);

export default router;
