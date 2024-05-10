const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const astroRouter = require("./Routes/AstrologerRoute");
const connectDB = require("./Config/db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/astrologers",rou );
app.get("/", async (req, res) => {
  res.send("Hello Astro Bharat");
});

app.use("/api/astrologer", astroRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server Started in http://localhost:${PORT}`);
  connectDB();
});
