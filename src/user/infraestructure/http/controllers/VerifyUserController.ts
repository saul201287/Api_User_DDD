import { Request, Response } from "express";
import { VerifyUseCase } from "../../../application/VerifyUseCase";

export class VerifyUserController {
  constructor(readonly authUseCase: VerifyUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.params;
      if (!data.email) {
        res.status(400).json({
          success: true,
          messages: "Request mal formado, faltan datos",
        });
      }

      const token = await this.authUseCase.run(data.email);

      if (typeof token != "string") {
        res.status(404).json({
          success: false,
          messages: "error rn la operación",
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
