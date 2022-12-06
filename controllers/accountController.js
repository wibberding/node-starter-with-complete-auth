
// Display root page
exports.index = (req, res, next) => {
	res.render('account/index', {user: req.user, layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};
