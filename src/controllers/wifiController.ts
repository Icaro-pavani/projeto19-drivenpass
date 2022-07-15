import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { ValidCreateWifiData } from "../schemas/wifiSchema.js";
import * as wifiService from "../services/wifiService.js";

export async function addWifi(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const wifiInfo: ValidCreateWifiData = res.locals.body;

  await wifiService.addNewWifi(wifiInfo, user.id);

  res.sendStatus(201);
}

export async function getUserWifis(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const wifis = await wifiService.obtainAllUserWifis(user.id);

  res.status(200).send(wifis);
}
