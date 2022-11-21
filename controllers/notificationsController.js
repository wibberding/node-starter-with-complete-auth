exports.error = (req, res, next) => {
	res.render('notifications/error', {layout: 'main'});
};