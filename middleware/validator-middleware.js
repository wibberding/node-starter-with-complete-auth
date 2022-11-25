import { validationResult } from "express-validator";

const ValidationMiddleware = (req,res,next) => {
  console.log("Body in validator middleware", req.body);
  let errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.json({
      errors: errors.array(),
    })
  }
  next();
};

export default ValidationMiddleware;