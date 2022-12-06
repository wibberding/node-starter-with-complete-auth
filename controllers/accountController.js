
// Display root page
exports.index = (req, res, next) => {
	res.render('account/index', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};
