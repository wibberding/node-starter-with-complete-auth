import { SECRET } from "../constants";
import { verify } from "jsonwebtoken";

const userAuth = (req, res, next) => {
  console.log('Made it to auth check');
  let token = req.cookies.token;
  console.log(token);
  try {
    var decoded = verify(token, SECRET);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch(err) {
    console.log("error", err);
    req.flash('info', 'Login failed. Please try again');
	  res.render('session/login', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
  }
  
};

export default userAuth;

