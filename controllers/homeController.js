// Display root page
exports.index = (req, res, next) => {

	res.render('home/index', {layout: 'main', authed: req.session.user, infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};

exports.about = (req, res, next) => {
	res.render('home/about', {layout: 'main', authed: req.session.user, infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};