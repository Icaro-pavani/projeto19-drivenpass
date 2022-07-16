import { Wifis } from "@prisma/client";
import Joi from "joi";

export type ValidCreateWifiData = Omit<Wifis, "userId" | "id">;

const wifiSchema = Joi.object<ValidCreateWifiData>({
  title: Joi.string().required(),
  wifiName: Joi.string().required(),
  password: Joi.string().required(),
});

export default wifiSchema;
