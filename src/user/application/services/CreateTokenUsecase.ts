import { Auth } from "../../domain/entities/Auth";
import { AuthRepository } from "../../domain/ports/AuthRepository";

export class CreateTokenUseCase {
  constructor(readonly repositoryAuth: AuthRepository) {}
  async run(pyload: Auth["pyload"]): Promise<string> {
    try {
      const token = await this.repositoryAuth.createToken(pyload);
      return token;
    } catch (error) {
      console.error(error);
      return "Error: " + error;
    }
  }
}
