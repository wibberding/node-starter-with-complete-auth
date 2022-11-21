exports.register= (req, res, next) => {
  res.render('session/register', {layout: 'main'});
};

exports.login= (req, res, next) => {
  res.render('session/login', {layout: 'main'});
};

exports.logout= (req, res, next) => {
  res.render('session/logout', {layout: 'main'});
};


exports.password_reset = (req, res, next) => {
  res.render('session/password-reset', {layout: false});
};

exports.account_verified= (req, res, next) => {
  res.render('session/verification-success', {layout: 'main'});
};
