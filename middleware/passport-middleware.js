import passport from "passport";
import User from "../models/User";
import {Strategy, ExtractJwt} from "passport-jwt"
import {SECRET as secretOrKey} from "../constants";

const cookieExtractor = req => {
  let jwt = null 

  if (req && req.cookies) {
      jwt = req.cookies('token')
  }
 
  console.log("in cookie extractor", jwt);
  return jwt
}
const opts = {
  secretOrKey,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async({ id }, done) => {
    try {
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      return done(null, user.getUserInfo());
    } catch (error) {
      done(null, false);
    }
  })
)