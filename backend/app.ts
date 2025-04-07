import express from "express";
import connectDB from "./config/db";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import "./config/passport";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:8080", "https://your-precise-baker-bice.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_default_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI!,
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true on Vercel
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

export default app;
