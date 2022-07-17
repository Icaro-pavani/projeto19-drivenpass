import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";

import handleErrors from "./middlewares/handleErrorsMiddleware.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(handleErrors);

const PORT: number = +process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API online on port ${PORT}`));
