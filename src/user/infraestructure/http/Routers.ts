import express from "express";
import {
  createUserController,
  getByIdUserController,
  changeRoleController,
  loginUserController,
  updateProfileController,
  verifyUserController
} from "./Dependecies";

export const userRouter = express.Router();

userRouter.put(
  "/change_role",
  (req, res) => {
    changeRoleController
      .run(req, res)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
);

userRouter.post(
  "/",
  async (req, res) => {
    await createUserController
      .run(req, res)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
);

userRouter.get("/:id", async (req, res) => {
  await getByIdUserController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.post("/login", async (req, res) => {
  await loginUserController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.put("/", async (req, res) => {
  await updateProfileController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.post("/verify_user", async (req, res) => {
  await verifyUserController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});