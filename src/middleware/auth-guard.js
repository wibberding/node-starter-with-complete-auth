import passport from "passport"; // -jwt?

export const userAuth = passport.authenticate("jwt", { session: false });