import { Request, Response } from "express";
import { GetByIdUserUseCase } from "../../../application/GetByIdUserUseCase";

export class GetByIdUserrController {
  constructor(readonly authUseCase: GetByIdUserUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const {id} = req.params;
      if (!id) {
        res.status(400).json({
          success: true,
          messages: "Request mal formado, faltan datos",
        });
      }

      const user = await this.authUseCase.run(Number(id));

      if (!user) {
        res.status(404).json({
          success: false,
          messages: "error en la operación",
          error: user,
        });
      } else {
        res.status(200).json({
          success: true,
          data: user,
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
