import { UserRepository } from "../domain/ports/UserRepository";

export class UpdateProfileUserUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(email: string, phone: string): Promise<boolean | null> {
    try {
      return await this.repo.updateProfile(email, phone);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
