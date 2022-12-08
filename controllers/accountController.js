
// Display root page
exports.index = (req, res, next) => {
	res.render('account/index', {user: req.session.user, layout: 'main', authed: req.session.user, infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};
