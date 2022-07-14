import { Router } from "express";

import { addCredential } from "../controllers/crendentialController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post(
  "/crendentials/create",
  validToken,
  validSchema(credentialSchema),
  addCredential
);

export default credentialRouter;
