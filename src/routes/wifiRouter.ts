import { Router } from "express";
import { addWifi, getUserWifis } from "../controllers/wifiController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifis/create", validToken, validSchema(wifiSchema), addWifi);
wifiRouter.get("/wifis", validToken, getUserWifis);

export default wifiRouter;
