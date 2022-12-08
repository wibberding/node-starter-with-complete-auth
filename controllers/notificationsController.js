exports.error = (req, res, next) => {
	res.render('notifications/error', {layout: 'main', authed: req.session.user, infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};