import { Router } from "express";

import { addNote } from "../controllers/noteController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import noteSchema from "../schemas/noteSchema.js";

const noteRouter = Router();

noteRouter.post("/notes/create", validToken, validSchema(noteSchema), addNote);

export default noteRouter;
