import Joi from "joi";
import { CreateUserData } from "../repositories/userRepository.js";

const userSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default userSchema;
