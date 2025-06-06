import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/db/entities//*.js"]
      : ["src/db/entities//*.ts"],
  //migrations: ["src/migrations//*.ts"],
  //subscribers: ["src/subscribers//*.ts"],
});

class Database {
  private static instance: Database;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = AppDataSource;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        signale.success("Conexión exitosa a la base de datos");
      }
    } catch (error) {
      signale.error("Error al conectar con la base de datos:", error);
      throw error;
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export const database = Database.getInstance();
