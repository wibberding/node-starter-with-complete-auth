// Takes the auth token out of the cookie and puts it on the header.
const headerAdder = (req, res, next) => {
  console.log(req.cookies);
  console.log(req.headers);
  if(req.cookies.token) {
    req.headers.authorization = "Bearer " + req.cookies.token;
    console.log(req.headers.authorization)

  }
  console.log("No auth token");
  next();
}

export default headerAdder;