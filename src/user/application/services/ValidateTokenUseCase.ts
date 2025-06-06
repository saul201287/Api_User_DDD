import { AuthRepository } from "../../domain/ports/AuthRepository";

export class ValidateTokenUseCase {
  constructor(readonly repositoryAuth: AuthRepository) {}
  async run(token: string): Promise<boolean | string | object> {
    try {
      const status = await this.repositoryAuth.validateToken(token);
      return status;
    } catch (error) {
      console.error(error);
      return "Error: " + error;
    }
  }
}
