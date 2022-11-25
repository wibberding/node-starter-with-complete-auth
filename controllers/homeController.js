// Display root page
exports.index = (req, res, next) => {

	res.render('home/index', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};

exports.about = (req, res, next) => {
	res.render('home/about', {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')});
};