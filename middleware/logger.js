// Middleware to look at each request as needed.

const logger = (req, res, next) => {
  console.log(req.session)
  console.log("auth", req.authed);
  next();
};

export default logger;