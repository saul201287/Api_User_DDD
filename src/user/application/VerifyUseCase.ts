import { Auth } from "../domain/entities/Auth";
import { UserRepository } from "../domain/ports/UserRepository";
import { CreateTokenUseCase } from "./services/CreateTokenUsecase";

export class VerifyUseCase {
  constructor(
    readonly repo: UserRepository,
    readonly createToken: CreateTokenUseCase
  ) {}

  async run(email: string): Promise<string | null> {
    try {
      const user = await this.repo.verify(email);
      if (!user) return null;

      const pyload: Auth["pyload"] = {
        id: user.id,
        email: user.email,
        rol: user.role,
      };
      return await this.createToken.run(pyload);
    } catch (error) {
      console.error("Error: " + error);
      return null;
    }
  }
}
