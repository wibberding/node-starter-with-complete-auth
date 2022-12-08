// Middleware to look at each request as needed.

const logger = (req, res, next) => {
  console.log(req.session)
  next();
};

export default logger;