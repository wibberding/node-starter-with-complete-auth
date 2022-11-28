import {userAuth} from '../middleware/auth-guard';

// Display root page
exports.index = (req, res, next) => {
	console.log("headers:", req.headers);
	res.render('account/index', userAuth, {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};
