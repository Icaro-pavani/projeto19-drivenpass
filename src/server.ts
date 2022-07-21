import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const PORT: number = +process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API online on port ${PORT}`));
