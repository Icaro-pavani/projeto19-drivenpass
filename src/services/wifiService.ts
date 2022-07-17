import { Wifis } from "@prisma/client";
import Cryptr from "cryptr";
import {
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import repositories from "../repositories/repositories.js";
import { ValidCreateWifiData } from "../schemas/wifiSchema.js";

const cryptr = new Cryptr(process.env.CRYPTRKEY);

const repositoryTable = "wifis";
const wifiRepository = repositories<Wifis>(repositoryTable);

export async function addNewWifi(
  wifiInfo: ValidCreateWifiData,
  userId: number
) {
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

export async function getWifiById(wifiId: number, userId: number) {
  if (!wifiId) {
    throw unprocessableError("The id must be an integer number!");
  }

  const wifi = await validWifiByUser(wifiId, userId);

  delete wifi.userId;
  wifi.password = cryptr.decrypt(wifi.password);

  return wifi;
}

export async function deleteWifi(wifiId: number, userId: number) {
  if (!wifiId) {
    throw unprocessableError("The id must be an integer number!");
  }

  await validWifiByUser(wifiId, userId);

  await wifiRepository.deleteById(wifiId);
}

async function validWifiByUser(cardId: number, userId: number) {
  const wifi = await wifiRepository.findById(cardId);
  if (!wifi) {
    throw unprocessableError("There is not a wifi for this id!");
  }

  if (wifi.userId !== userId) {
    throw unauthorizedError("This wifi belongs to another user!");
  }

  return wifi;
}
