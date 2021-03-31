import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import router from "./routes";
import passport from "passport";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "./routes/auth/passport";
const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(
  "mongodb+srv://jay:jay51419@cluster0.xmpnk.mongodb.net/Auth?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    console.error(err);
  }
);
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/api", router);

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send({msg:"You are logged in"});
  }
);
app.listen(port, () => console.log(`server running at ${port}`));
