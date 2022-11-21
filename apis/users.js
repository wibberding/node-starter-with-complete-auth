import { join } from "path";
import User from "../models/User";
import { Router } from "express";
import { randomBytes } from "crypto";
import { DOMAIN } from "../constants";
import { userAuth } from "../middleware/auth-guard";
import sendMail from "../functions/email-sender";
import { AuthenticateValidations, RegisterValidations, ResetPassword } from "../validators/user-validators";
import Validator from "../middleware/validator-middleware";
// import { flatten } from "lodash";

// import passport from "passport";

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
    console.log("req.body", req.body);
      let {username, email } = req.body;
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
        <a href="${DOMAIN}/users/verify-now/${user.verificationCode}">Verify Now</a>
      `;
      sendMail(user.email, "Verify Account", "Please verify your account.", html);
      return res.status(201).json({
        success: true,
        message: "Hurray! Your account is created. Please verify your email address."
      })
   } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      // message: "An error occurred."
    })
   }
  }
);

/**
 * @description To verify email of a new user account
 * @api /users/verify-now/:verificationCode
 * @access Public <Only via email>
 * @type GET
 */

router.get('/verify-now/:verificationCode', async( req, res ) => {
  try {
    let { verificationCode } = req.params;
    let user = await User.findOne({ verificationCode });
    if(!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Invalid verification code."
      })
    }
    user.verified = true;
    user.verificationCode = undefined;
    await user.save();
    return res.render('notifications/verification-success');
    // return res.sendFile(join(__dirname, "../templates/verification-success.html"));

  } catch (error) {
    return res.render('notifications/error');
    // return res.sendFile(join(__dirname, "../templates/errors.html"));
  }
})

/**
 * @description To verify a user and get auth token
 * @api /users/api/authenticate
 * @access Public
 * @type POST
 */

router.post('/api/authenticate', AuthenticateValidations, Validator, async(req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "Username not found."
      })
    };

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password."
      })
    };

    let token = await user.generateJWT();
    return res.status(200).json({
      success: true,
      user: user.getUserInfo(),
      token: `Bearer ${token}`,
      message: "Hurray! You are now logged in."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      // message: "An error occurred."
    })
  }
});

/**
 * @description To get authenticated user's profile
 * @api /users/api/authenticate
 * @access Private
 * @type GET
 */

router.get('/api/authenticate', userAuth, async (req, res) => {
  return res.status(200).json({
    user: req.user,
  })
});

/**
 * @description To initiate the password reset process.
 * @api /users/api/reset-password
 * @access Public
 * @type POST
 */
router.put('/api/reset-password', ResetPassword, Validator, async (req,res) => {
  try {
    let { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email is not found."
      });
    };
    user.generatePasswordReset();
    await user.save();
    // Send password reset link to email.
    let html = `
      <h1>Hello ${user.username}</h1>
      <p>Please click the following link to reset your password.</p>
      <p>If you didn't make this request, please ignore this email.</p>
      <a href="${DOMAIN}/users/reset-password-now/${user.resetPasswordToken}">Verify Now</a>
    `;
    sendMail(user.email, "Verify Account", "Please verify your account.", html);
    return res.status(201).json({
      success: true,
      message: "Hurray! Your account is created. Please verify your email address."
    })
    return res.status(200).json({
      success: true,
      message: "A password reset link has been sent to your email."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred."
    });
  }
});

/**
 * @description To render reset password page.
 * @api /users/reset-password/:resetPasswordToken
 * @access Restricted via email
 * @type GET
 */
router.get('/reset-password-now/:resetPasswordToken', async (req, res) => {
  try {
    let { resetPasswordToken } = req.params;
    let user = await User.findOne({ resetPasswordToken, resetPasswordExpiresIn: { $gt: Date.now() } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      })
    };
    return res.render('notifications/password-reset');
    // return res.sendFile(join(__dirname, "../templates/password-reset.html"));
  } catch (error) {
    return res.render('notifications/error');
    // return res.sendFile(join(__dirname, "../templates/errors.html"));
  }
});

/**
 * @description To reset password and send email about it.
 * @api /users/api/reset-password-now
 * @access Restricted via email
 * @type POST
 */

router.post('/api/reset-password-now', async (req,res) => {
  try {
    let { resetPasswordToken, password } = req.body;
    let user = await User.findOne({ resetPasswordToken, resetPasswordExpiresIn: { $gt: Date.now() } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      })
    };
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresIn = undefined;
    await user.save();
    // Send email that password has been reset.
    let html = `
      <h1>Hello ${user.username}</h1>
      <p>Your password has bee reset successfully.</p>
    `;
    sendMail(user.email, "Reset Password Successful", "Your password has been reset.", html);

    return res.status(200).json({
      success: true, 
      message: "Your password has been rest successfullly."
    })
  } catch (error) {
    return res.status(500).json({
      success: false, 
      message: "Something went wrong."
    });
  };
});



export default router;