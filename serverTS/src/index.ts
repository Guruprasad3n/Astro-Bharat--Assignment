import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import astroRouter from "./Routes/AstrologerRoute";
import connectDB from "./Config/db";

dotenv.config();
const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a simple route
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Astro Bharat");
});

// Define the astrologer route
app.use("/api/astrologer", astroRouter);

const PORT: number = Number(process.env.PORT) || 8080;
app.listen(PORT, async () => {
  console.log(`Server Started in http://localhost:${PORT}`);
  connectDB();
});
