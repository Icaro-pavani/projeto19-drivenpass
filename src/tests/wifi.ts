import supertest from "supertest";

import app from "../app.js";
import { prisma } from "../config/database.js";
import userFactory from "./factory/userFactory.js";
import wifiFactory from "./factory/wifiFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users`;
  await prisma.$executeRaw`DELETE FROM wifis`;
});

describe("Wifis test suite", () => {
  it("create a wifi", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    let response = await supertest(app).post("/sign-in").send(userData);
    const token = response.body.token;
    expect(token).not.toBeNull();

    const wifiData = wifiFactory.createWifiData();
    response = await supertest(app)
      .post("/wifis/create")
      .send(wifiData)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);

    const savedWifi = await prisma.wifis.findFirst({
      where: { title: wifiData.title },
    });
    expect(savedWifi).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
