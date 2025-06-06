export class User {
  constructor(
    readonly id: number,
    readonly first_name: string,
    readonly last_name: string,
    readonly phone: string,
    readonly email: string,
    readonly password: string,
    readonly role: string,
    readonly is_verified: boolean
  ) {}

  toPublicJSON() {
    const { password, ...publicData } = this;
    return publicData;
  }
}
