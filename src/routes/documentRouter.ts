import { Router } from "express";
import {
  addDocument,
  deleteOneDocument,
  getDocument,
  getUserDocuments,
} from "../controllers/documentController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import documentSchema from "../schemas/documentSchema.js";

const documentRouter = Router();

documentRouter.post(
  "/documents/create",
  validToken,
  validSchema(documentSchema),
  addDocument
);
documentRouter.get("/documents", validToken, getUserDocuments);
documentRouter.get("/documents/get/:id", validToken, getDocument);
documentRouter.delete("/documents/delete/:id", validToken, deleteOneDocument);

export default documentRouter;
