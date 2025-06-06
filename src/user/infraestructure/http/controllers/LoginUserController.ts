import { Request, Response } from "express";
import { LoginUserUseCase } from "../../../application/LoginUserUseCase";

export class LoginUserController {
  constructor(readonly authUseCase: LoginUserUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.email || !data.password) {
        res.status(400).json({
          success: true,
          messages: "Request mal formado, faltan datos",
        });
      }
      const token = await this.authUseCase.run(data.email, data.password);

      if (typeof token != "string") {
        res.status(404).json({
          success: false,
          messages: token,
          error: token,
        });
      } else {
        res.status(200).json({
          success: true,
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }
}
