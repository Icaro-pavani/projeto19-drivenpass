import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());

const PORT: number = +process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API online on port #{PORT}`));
