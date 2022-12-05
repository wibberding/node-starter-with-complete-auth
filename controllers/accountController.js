import {userAuth} from '../middleware/auth-check';

// Display root page
exports.index = (req, res, next) => {
	res.render('account/index', userAuth, {layout: 'main', infoMessage: req.flash('info'), errorMessage: req.flash('error')}); 
};
