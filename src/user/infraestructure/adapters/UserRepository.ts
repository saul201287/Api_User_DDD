import { User } from "../../domain/entities/User";
import { DataSource, Repository } from "typeorm";
import { EUser } from "../../../db/entities/EUser";
import { UserRepository } from "../../domain/ports/UserRepository";

export class MysqlRepositoryUser implements UserRepository {
  private readonly userRepository: Repository<EUser>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(EUser);
  }

  async create(user: User): Promise<User | null> {
    try {
      const existingUserByEmail = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (existingUserByEmail) {
        throw new Error(
          "Error: El email ya está registrado. Por favor, usa un email diferente."
        );
      }

      const existingUserByPhone = await this.userRepository.findOne({
        where: { phone: user.phone },
      });
      if (existingUserByPhone) {
        throw new Error(
          "Error: El número de teléfono ya está registrado. Por favor, usa un número diferente."
        );
      }

      const newUser = await this.userRepository.create({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        rol: user.role,
        is_verified: true,
      });

      const saveUser = await this.userRepository.save(newUser);

      return new User(
        saveUser.id!,
        saveUser.first_name!,
        saveUser.last_name!,
        saveUser.email!,
        "",
        saveUser.phone!,
        saveUser.rol!,
        saveUser.is_verified!
      );
    } catch (error) {
      console.error("Error en createUser:", error);
      return null;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new Error(
          "Error: No se encontro el usuario con el email proporcionado"
        );
      }
      return new User(
        user.id!,
        user.first_name!,
        user.last_name!,
        user.email!,
        user.password!,
        user.phone!,
        user.rol!,
        user.is_verified!
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async verify(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      if (!user) {
        console.error("No se encontro el usuario con el email proporcionado");
        return null;
      }

      return new User(
        user.id!,
        user.first_name!,
        user.last_name!,
        user.email!,
        "",
        user.phone!,
        user.rol!,
        user.is_verified!
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateProfile(email: string, phone: string): Promise<boolean | null> {
    try {
      const userFind = await this.userRepository.findOne({
        where: { email: email },
      });

      if (!userFind) {
        console.error("No se encontró el usuario con el email proporcionado");
        return null;
      }

      userFind.phone = phone;
      const saveUser = await this.userRepository.save(userFind);

      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new Error(
          "Error: No se encontro el usuario con el id proporcionado"
        );
      }
      return new User(
        user.id!,
        user.first_name!,
        user.last_name!,
        user.email!,
        user.password!,
        user.phone!,
        user.rol!,
        user.is_verified!
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async changeRole(id: number, role: string): Promise<boolean | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new Error("No se encontro el usuario con el id proporcionado");
      }
      user.rol = role;
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
}
