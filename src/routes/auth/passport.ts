import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import User from "../../models/User";

const clientID =
  "880196756657-v768r80bs0nb2cqsecuuulj23kopjrrg.apps.googleusercontent.com";
const clientSecret = "KhF06E2I6i-LCs66yILwu4eF";
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return await User.findOne({ email })
        .then(async (user) => {
          if (!user) {
            return cb(null, false, { message: "Email incorrect" });
          }
          await bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return cb(null, user, { message: "Logged In Successfully" });
            } else {
              return cb(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      console.log(`jwtPayload : ${jwtPayload}`);
      return User.findById(jwtPayload._id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
