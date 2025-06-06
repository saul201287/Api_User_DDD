import { app } from "./cmd/server";
import { Signale } from "signale";
import { database } from "./db/DataBase";

const logger = new Signale({
  secrets: ["([0-9]{4}-?)+"],
});

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    const dataSource = database.getDataSource();
    await dataSource.initialize();
    logger.log("Conexión a la base de datos establecida.");

    app.listen(port, () => {
      logger.log(`Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    logger.error("Error al iniciar el servidor!:", error);
    process.exit(1);
  }
}

startServer();
