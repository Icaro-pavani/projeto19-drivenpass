import Joi from "joi";
import { CreateWifiData } from "../repositories/wifiRepository.js";

export type ValidCreateWifiData = Omit<CreateWifiData, "userId">;

const wifiSchema = Joi.object<ValidCreateWifiData>({
  title: Joi.string().required(),
  wifiName: Joi.string().required(),
  password: Joi.string().required(),
});

export default wifiSchema;
