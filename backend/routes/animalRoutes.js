import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/animalController.js";

const animalRouter = express.Router();

animalRouter.route("/").get(getAll).post(create);

animalRouter.route("/:id").get(getById).put(update).delete(remove);
export default animalRouter;
