import { Router } from "express";

import {
  addNote,
  deleteOneNote,
  getNote,
  getUserNotes,
} from "../controllers/noteController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import noteSchema from "../schemas/noteSchema.js";

const noteRouter = Router();

noteRouter.post("/notes/create", validToken, validSchema(noteSchema), addNote);
noteRouter.get("/notes", validToken, getUserNotes);
noteRouter.get("/notes/get/:id", validToken, getNote);
noteRouter.delete("/notes/delete/:id", validToken, deleteOneNote);

export default noteRouter;
