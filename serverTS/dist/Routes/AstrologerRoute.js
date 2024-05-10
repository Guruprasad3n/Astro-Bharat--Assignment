"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AstrologerController_1 = require("../Controllers/AstrologerController");
const astroRouter = express_1.default.Router();
astroRouter.post("/register", AstrologerController_1.registerAstrologer);
astroRouter.get("/", AstrologerController_1.allAstrologers);
astroRouter.put("/:id", AstrologerController_1.editAstrologer);
exports.default = astroRouter;
