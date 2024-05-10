const express = require("express");
const {
  registerAstrologer,
  allAstrologers,
  editAstrologer,
} = require("../Controllers/AstrologerController");

const astroRouter = express.Router();

astroRouter.post("/register", registerAstrologer);
astroRouter.get("/", allAstrologers);
astroRouter.put("/:id", editAstrologer);

module.exports = astroRouter;
