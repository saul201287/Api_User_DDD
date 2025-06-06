import { Request, Response } from "express";
import { UpdateProfileUserUseCase } from "../../../application/UpdateProfileUserUseCase";

export class UpdateProfileController {
  constructor(readonly usecase: UpdateProfileUserUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const {email, phone} = req.params;
      
      if (!email && !phone) {
        res.status(400).json({
          success: true,
          messages: "Request mal formado, faltan datos",
        });
      }

      const result = await this.usecase.run(email, phone);
      if ( result == true) {
        res.status(200).json({
          status: true,
          messages: "Perfil modificado",
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
