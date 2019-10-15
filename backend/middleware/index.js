//all the middleware gose here
var middlewareOBJ = {};

middlewareOBJ.isLogedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
};



module.exports = middlewareOBJ;