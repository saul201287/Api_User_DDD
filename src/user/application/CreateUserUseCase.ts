import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/ports/UserRepository";
import { IEncript } from "./services/IEncript";
import { CreateTokenUseCase } from "./services/CreateTokenUsecase";
import { Auth } from "../domain/entities/Auth";

export class CreateUserUseCase {
  constructor(
    readonly repo: UserRepository,
    readonly encrypt: IEncript,
    readonly tokenCreate: CreateTokenUseCase
  ) {}

  async run(user: User): Promise<string | null> {
    try {
      const passNew = await this.encrypt.encodePassword(user.password);
      user = new User(
        user.id,
        user.first_name,
        user.last_name,
        user.phone,
        user.email,
        passNew,
        user.role,
        user.is_verified
      );

      const userNew = await this.repo.create(user);
      if (userNew == null) {
        return null;
      }
      const pyload: Auth["pyload"] = {
        id: userNew.id,
        email: userNew.email,
        rol: userNew.role,
      };

      const token = await this.tokenCreate.run(pyload);
      return token;
    } catch (error) {
      console.error(error);
      return "Error: " + error;
    }
  }
}
