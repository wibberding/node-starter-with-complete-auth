// Takes the auth token out of the cookie and puts it on the header.
const headerAdder = (req, res, next) => {
  console.log("Cookies", req.cookies);
  next();
}

export default headerAdder;