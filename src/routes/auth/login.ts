import { Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export function login(router: Router): void {
  router.post("/login", function (req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.json({
          message: info ? info.message : "Login failed",
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        console.log(user);
        const token = jwt.sign(user.toJSON(), "your_jwt_secret");
        return res.json({ user, token ,message:"You logged in successfully"});
      });
    })(req, res);
  });
}
