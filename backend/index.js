import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToDb from "./connection.js";
import notesRoute from "./routes/notes.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import { checkForAuthentication } from "./middleware/auth.js";

const app = express();

const DB_URL = process.env.MONGO_URL;

// connection
connectToDb(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

// middlewares
app.use(express.json());
app.use(cookieParser());

// Use CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes
app.use("/notes", checkForAuthentication, notesRoute);
app.use("/auth", userRoute);

// server connection
app.listen(process.env.PORT || 3000, () => console.log("Connected To Server"));
