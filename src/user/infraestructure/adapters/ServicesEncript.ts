import { compare, hash } from "bcryptjs";
import { IEncript } from "../../application/services/IEncript";

export class EncryptServices implements IEncript {
  async encodePassword(password: string): Promise<string> {
    const newPassword = await hash(password, Number(process.env.SECRET_JUMP));
    return newPassword;
  }

  async compareTo(
    password: string,
    hashedPassword: string
  ): Promise<boolean | null> {
    try {
      const result = await compare(password, hashedPassword);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
