import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/ports/UserRepository";

export class GetByIdUserUseCase {
  constructor(
    readonly repo: UserRepository,
  ) {}

  async run(id: number): Promise<User | null> {
    try {

      const userFind = await this.repo.getById(id);
      if (userFind == null) {
        return null
      }
      return userFind;
    } catch (error) {
      console.error("Error: " + error);
      return null;
    }
  }
}
