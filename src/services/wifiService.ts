import { Wifis } from "@prisma/client";
import Cryptr from "cryptr";
import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import { ValidCreateWifiData } from "../schemas/wifiSchema.js";

const cryptr = new Cryptr(process.env.CRYPTRKEY);

export async function addNewWifi(
  wifiInfo: ValidCreateWifiData,
  userId: number
) {
  const registeredWifi = await wifiRepository.findByUserIdAndTitle(
    userId,
    wifiInfo.title
  );
  if (!!registeredWifi) {
    throw unauthorizedError("The user already has a wifi with this title!");
  }
  wifiInfo.password = cryptr.encrypt(wifiInfo.password);

  const wifiData = { ...wifiInfo, userId };
  await wifiRepository.insert(wifiData);
}

export async function obtainAllUserWifis(userId: number) {
  const wifisResult = await wifiRepository.findAllByUserId(userId);
  const wifis = wifisResult.map((wifi: Wifis) => {
    delete wifi.userId;
    wifi.password = cryptr.decrypt(wifi.password);
    return wifi;
  });
  return wifis;
}
