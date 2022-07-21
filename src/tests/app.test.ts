import supertest from "supertest";

import app from "../app.js";
import { prisma } from "../config/database.js";
import userFactory from "./factory/userFactory.js";
import wifiFactory from "./factory/wifiFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users`;
  await prisma.$executeRaw`DELETE FROM wifis`;
});

describe("Usertests suite", () => {
  it("given email and password, create user", async () => {
    const userData = userFactory.createSignUp();
    const response = await supertest(app).post("/sign-up").send(userData);
    expect(response.statusCode).toBe(201);
  });

  it("given email and password with wrong length,  fail to create user", async () => {
    const userData = userFactory.createSignUp("teste@gmail.com", 4);
    const response = await supertest(app).post("/sign-up").send(userData);
    expect(response.statusCode).toBe(422);
  });

  it("given email already registered, fail to create user", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const userSameEmailData = userFactory.createSignUp();
    const response = await supertest(app)
      .post("/sign-up")
      .send(userSameEmailData);
    expect(response.statusCode).toBe(409);
  });

  it("given email and password already registered, login user", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const response = await supertest(app).post("/login").send(userData);
    const token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(token).not.toBeNull();
  });

  it("given email not registered and password, fail to login", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const unregisteredUserData = userFactory.createSignUp("teste@gg.cc");
    const response = await supertest(app)
      .post("/login")
      .send(unregisteredUserData);
    const token = response.body.token;
    expect(response.statusCode).toBe(401);
    expect(token).toBeUndefined();
  });

  it("given registered email and wrong password, fail to login", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    const wrongUserData = userFactory.createSignUp();
    const response = await supertest(app).post("/login").send(wrongUserData);
    const token = response.body.token;
    expect(response.statusCode).toBe(401);
    expect(token).toBeUndefined();
  });
});

describe("Wifis test suite", () => {
  it("create a wifi", async () => {
    const userData = userFactory.createSignUp();
    await userFactory.createUser(userData);
    let response = await supertest(app).post("/login").send(userData);
    const token = response.body.token;

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
