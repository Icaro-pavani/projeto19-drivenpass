import { Router } from "express";

import {
  addCredential,
  getUserCredentials,
} from "../controllers/credentialController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
  "/credentials/create",
  validToken,
  validSchema(credentialSchema),
  addCredential
);

credentialRouter.get("/credentials", validToken, getUserCredentials);

export default credentialRouter;
