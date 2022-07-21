import express, { json } from "express";
import "express-async-errors";

import router from "./routes/index.js";
import cors from "cors";

import handleErrors from "./middlewares/handleErrorsMiddleware.js";

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(handleErrors);

export default app;
