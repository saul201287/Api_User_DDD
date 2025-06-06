import { Request, Response } from "express";
import { ChangeRoleUserUseCase } from "../../../application/ChangeRoleUserUseCase";

export class ChangeRoleController {
  constructor(readonly usecase: ChangeRoleUserUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const {id, rol} = req.params;
      
      if (!id && !rol) {
        res.status(400).json({
          success: true,
          messages: "Request mal formado, faltan datos",
        });
      }

      const result = await this.usecase.run(Number(id), rol);
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
