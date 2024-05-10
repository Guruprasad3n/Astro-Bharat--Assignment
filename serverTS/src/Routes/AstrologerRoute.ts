import express, { Router } from "express";
import {
  registerAstrologer,
  allAstrologers,
  editAstrologer,
} from "../Controllers/AstrologerController";

const astroRouter: Router = express.Router();

astroRouter.post("/register", registerAstrologer);
astroRouter.get("/", allAstrologers);
astroRouter.put("/:id", editAstrologer);

export default astroRouter;
