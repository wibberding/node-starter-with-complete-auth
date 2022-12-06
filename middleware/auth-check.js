// import { Schema, model } from "mongoose";
// import {compare, hash} from "bcryptjs";
import { SECRET } from "../constants";
import { verify } from "jsonwebtoken";
// import { randomBytes} from "crypto";
// import { pick } from "lodash";

const userAuth = (req, res, next) => {
  console.log('Made it to auth check');
  let token = req.cookies.token;
  console.log(token);
  try {
    var decoded = verify(token, SECRET);
    console.log("decoded", decoded);
  } catch(err) {
    console.log("error", err);
  }
  next();
};

export default userAuth;

