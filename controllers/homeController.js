// Display root page
exports.index = (req, res, next) => {
	res.render('home/index', {layout: 'main', cat: "7", dog: "bowwow"}); //Testing variable passing.
};

exports.about = (req, res, next) => {
	res.render('home/about', {layout: 'main'});
};