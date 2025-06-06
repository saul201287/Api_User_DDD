import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { ChangeRoleUserUseCase } from "../../application/ChangeRoleUserUseCase";
import { LoginUserUseCase } from "../../application/LoginUserUseCase";
import { GetByIdUserUseCase } from "../../application/GetByIdUserUseCase";
import { UpdateProfileUserUseCase } from "../../application/UpdateProfileUserUseCase";
import { VerifyUseCase } from "../../application/VerifyUseCase";
import { CreateTokenUseCase } from "../../application/services/CreateTokenUsecase";
import { ValidateTokenUseCase } from "../../application/services/ValidateTokenUseCase";
import { CreateUserController } from "./controllers/CreateUserController";
import { ChangeRoleController } from "./controllers/ChangeRoleController";
import { LoginUserController } from "./controllers/LoginUserController";
import { GetByIdUserrController } from "./controllers/GetByIdControllers";
import { UpdateProfileController } from "./controllers/UpdateProfileController";
import { VerifyUserController } from "./controllers/VerifyUserController";
import { EncryptServices } from "../adapters/ServicesEncript";
import { database } from "../../../db/DataBase";
import { MysqlRepositoryUser } from "../adapters/UserRepository";
import { AuthServices } from "../adapters/ServicesAuth";

const dataSource = database.getDataSource();

const repository = new MysqlRepositoryUser(dataSource);
const servicesEncript = new EncryptServices();
const servicesAuth = new AuthServices(dataSource);

const servicesCreateToken = new CreateTokenUseCase(servicesAuth);
const servicesValidateToken = new ValidateTokenUseCase(servicesAuth);

const cretaeUserUseCase = new CreateUserUseCase(
  repository,
  servicesEncript,
  servicesCreateToken
);
const loginUserUseCase = new LoginUserUseCase(
  repository,
  servicesEncript,
  servicesCreateToken
);
const changeRoleUserUseCase = new ChangeRoleUserUseCase(repository);
const updateProfileUserUseCase = new UpdateProfileUserUseCase(repository);
const getByIdUserUseCase = new GetByIdUserUseCase(repository);
const verifyUseCase = new VerifyUseCase(repository, servicesCreateToken);

export const createUserController = new CreateUserController(cretaeUserUseCase);
export const loginUserController = new LoginUserController(loginUserUseCase);
export const changeRoleController = new ChangeRoleController(
  changeRoleUserUseCase
);
export const getByIdUserController = new GetByIdUserrController(
  getByIdUserUseCase
);
export const updateProfileController = new UpdateProfileController(
  updateProfileUserUseCase
);
export const verifyUserController = new VerifyUserController(verifyUseCase);
