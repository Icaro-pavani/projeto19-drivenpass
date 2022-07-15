import { Router } from "express";
import {
  addWifi,
  deleteOneWifi,
  getUserWifis,
  getWifi,
} from "../controllers/wifiController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifis/create", validToken, validSchema(wifiSchema), addWifi);
wifiRouter.get("/wifis", validToken, getUserWifis);
wifiRouter.get("/wifis/get/:id", validToken, getWifi);
wifiRouter.delete("/wifis/delete/:id", validToken, deleteOneWifi);

export default wifiRouter;
