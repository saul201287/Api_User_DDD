import { Request, Response } from "express";
import { User } from "../../../domain/entities/User";
import { CreateUserUseCase } from "../../../application/CreateUserUseCase";

export class CreateUserController {
  constructor(readonly usecase: CreateUserUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = new User(
        0,
        data.first_name,
        data.last_name,
        data.phone,
        data.email,
        data.password,
        data.rol,
        data.is_verified
      );

      const result = await this.usecase.run(user);
      if (typeof result == "string") {
        res.status(201).json({
          status: true,
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          messages: "No se pudo realizar la acción",
          error: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        messages: "error en el servidor",
        error: error,
      });
    }
  }
}
