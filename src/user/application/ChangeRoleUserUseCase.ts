import { UserRepository } from "../domain/ports/UserRepository";

export class ChangeRoleUserUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(id: number, role: string): Promise<boolean | null> {
    try {
      return await this.repo.changeRole(id, role);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
