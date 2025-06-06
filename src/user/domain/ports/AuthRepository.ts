import { Auth } from "../entities/Auth";

export interface AuthRepository {
  createToken(pyload: Auth["pyload"]): Promise<string>;
  validateToken(token: string): Promise<boolean | string | object>;
}
