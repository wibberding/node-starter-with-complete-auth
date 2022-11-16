import { User } from "../model";
import { Router } from "express";
import { randomBytes } from "crypto";
import sendMail from "../functions/email-sender";
import { RegisterValidations } from "../validators";
import Validator from "../middleware/validator-middleware";

const router = Router();

/**
 * @description To create a new user account
 * @api /users/api/register
 * @access Public
 * @type POST
 */

router.post(
  "/api/register", 
  RegisterValidations, 
  Validator, 
  async (req, res) => {
   try {
      let {username, email } = req.body();
      // Check if the username is taken.
      let user = await User.findOne({ username });
      if(user) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken."
        })
      }

      // Check if user exists with this email
      user = await User.findOne({ email });
      if(user) {
        return res.status(400).json({
          success: false,
          message: "Email is already registered. Did you forget the password? Try resetting it."
        })
      }

      user = new User({
        ...req.body,
        verificationCode: randomBytes(20).toString("hex"),
      })

      await user.save();

      //Send an email to the user with a verification link.
      let html = `
        <h1>Hello ${user.username}</h1>
        <p>Please click the following link to verify your account</p>
        <a href="/users/verify-now/${user.verificationCode}">Verify Now</a>
      `;
      sendMail(user.email, "Verify Account", "Please verify your account.", html);
      return res.status(201).json({
        success: true,
        message: "Hurray! Your account is created. Please verify your email address."
      })
   } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred."
    })
   }
  }
);

export default router;