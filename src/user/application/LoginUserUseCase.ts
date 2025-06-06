import { UserRepository } from "../domain/ports/UserRepository";
import { IEncript } from "./services/IEncript";
import { CreateTokenUseCase } from "./services/CreateTokenUsecase";
import { Auth } from "../domain/entities/Auth";

export class LoginUserUseCase {
  constructor(
    readonly repo: UserRepository,
    readonly validatePass: IEncript,
    readonly createToken: CreateTokenUseCase
  ) {}
  async run(email: string, password: string): Promise<string | null> {
    try {
      const user = await this.repo.login(email, password);
      if (!user) return null;

      const passStatus = await this.validatePass.compareTo(
        password,
        user.password
      );
      if (passStatus) {
        const pyload: Auth["pyload"] = {
          id: user.id,
          email: user.email,
          rol: user.role,
        };
        return await this.createToken.run(pyload);
      }
      return null;
    } catch (error) {
      console.error("Error: " + error);
      return null;
    }
  }
}
