import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../../models/User";

export function googleAuth(router: Router): void {
  router.post(
    "/googleAuth",
    async (req: Request, res: Response): Promise<void> => {
      let { email } = {
        email: req.body.email,
      };
      await User.findOne({ email }).then(async (user) => {
        if (user) {
          const token = jwt.sign(user.toJSON(), "your_jwt_secret");
          return res.json({ user, token });
        } else {
          await new User({ email: email }).save().then((user) => {
            const token = jwt.sign(user.toJSON(), "your_jwt_secret");
            return res.json({ user, token });
          });
        }
      });
    }
  );
}
