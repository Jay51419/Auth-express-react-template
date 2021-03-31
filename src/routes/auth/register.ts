import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import validator from 'validator';
import User from "../../models/User";

export function register(router: Router): void {
      
  router.post(
    "/register",
    async (req: Request, res: Response): Promise<void> => {
      const isEmailValid = validator.isEmail(req.body.email)
      const isPasswordValid = validator.isStrongPassword(req.body.password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })

      let { email, password } = {
        email: req.body.email,
        password: req.body.password,
      };
      if(isEmailValid){
        await User.findOne({ email }).then(async (user) => {
        if (user) {
          return res.json({ message: "Email already exists" });
        } else {
          if(isPasswordValid){
            await bcrypt.hash(password, 10, async function (err, hash) {
            await new User({ email: email, password: hash })
              .save()
              .then(() => res.json({ message: "Registeration successfull" }));
          });             
          }else{
            res.json({message:"Your password must contain minimum length of 8"})
            
        }
          }
      });
      }else{
        res.json({message:"Invalid Email"})
      }
      
    }
  );
}
