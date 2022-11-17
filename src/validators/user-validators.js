import { check } from "express-validator";

const name = check("name", "Name is required.").not().isEmpty();
const username = check("username", "Username is required.").not().isEmpty();
const email = check("email", "Please provide a valid email address.").isEmail();
const password = check(
  "password", 
  "A password of a minimum of six characters is required."
  ).isLength(
      {
        min: 6,
      }
    );

export const RegisterValidations = [password, name, username, email];
export const AuthenticateValidations = [username, password];
export const ResetPassword = [email];
