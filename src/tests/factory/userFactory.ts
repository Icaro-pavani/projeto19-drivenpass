import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { prisma } from "../../config/database.js";
import { CreateUserData } from "../../repositories/userRepository.js";

function createSignUp(email = "teste@gmail.com", passwordLength = 12) {
  const password = faker.internet.password(passwordLength);
  return {
    email,
    password,
  };
}

async function createUser(signUp: CreateUserData) {
  const user = await prisma.users.create({
    data: {
      email: signUp.email,
      password: bcrypt.hashSync(signUp.password, 10),
    },
  });

  return { ...user, plainPassword: signUp.password };
}

const userFactory = { createSignUp, createUser };
export default userFactory;
