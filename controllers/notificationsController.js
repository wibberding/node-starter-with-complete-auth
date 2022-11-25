exports.error = (req, res, next) => {
	res.render('notifications/error', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};