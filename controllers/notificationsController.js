exports.error = (req, res, next) => {
	res.render('notifications/error', {layout: 'main'});
};

exports.password_reset = (req, res, next) => {
	res.render('notifications/password-reset', {layout: false});
};

exports.account_verified= (req, res, next) => {
	res.render('notifications/verification-success', {layout: 'main'});
};