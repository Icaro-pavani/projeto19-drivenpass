import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validSchema(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      res.locals.body = validation;
    } catch (error) {
      return res.status(422).send(error.message);
    }

    next();
  };
}
