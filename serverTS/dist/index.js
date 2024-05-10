"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const AstrologerRoute_1 = __importDefault(require("./Routes/AstrologerRoute"));
const db_1 = __importDefault(require("./Config/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Define a simple route
app.get("/", async (req, res) => {
    res.send("Hello Astro Bharat");
});
// Define the astrologer route
app.use("/api/astrologer", AstrologerRoute_1.default);
const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, async () => {
    console.log(`Server Started in http://localhost:${PORT}`);
    (0, db_1.default)();
});
