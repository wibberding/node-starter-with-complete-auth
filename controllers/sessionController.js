exports.register= (req, res, next) => {
  res.render('session/register', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};

exports.login= (req, res, next) => {
  res.render('session/login', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};

exports.logout= (req, res, next) => {
  req.user = null;
  res.clearCookie('token');
  res.render('session/logout', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};


exports.password_reset = (req, res, next) => {
  res.render('session/password-reset', {layout: false, infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};

exports.account_verified= (req, res, next) => {
  res.render('session/verification-success', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};
