import { faker } from "@faker-js/faker";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.CRYPTRKEY);

import { prisma } from "../../config/database.js";
import { ValidCreateWifiData } from "../../schemas/wifiSchema.js";
import userFactory from "./userFactory.js";

function createWifiData(
  title = "test1",
  wifiName = "test_vizinho",
  passwordLength = 10
) {
  return {
    title,
    wifiName,
    password: faker.internet.password(passwordLength),
  };
}

async function createDbWifi(wifiData: ValidCreateWifiData, userId: number) {
  const { title, wifiName, password }: ValidCreateWifiData = wifiData;
  const wifi = await prisma.wifis.create({
    data: {
      title,
      wifiName,
      password,
      userId,
    },
  });
  return wifi;
}

const wifiFactory = { createDbWifi, createWifiData };

export default wifiFactory;
