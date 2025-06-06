export class Auth {
  constructor(
    readonly pyload: Pyload,
    readonly secret: string,
    readonly options: JSON
  ) {}
}

class Pyload {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly rol: string
  ) {}
}
