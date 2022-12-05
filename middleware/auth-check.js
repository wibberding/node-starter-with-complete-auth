import { Schema, model } from "mongoose";
import {compare, hash} from "bcryptjs";
import { SECRET } from "../constants";
import { sign } from "jsonwebtoken";
import { randomBytes} from "crypto";
import { pick } from "lodash";

export const userAuth = (req, res, next) => {
  console.log('Made it to auth check');
  console.log(req.cookies.token);
  next();
};