
const ensureAuthenticated = (req, res, next) =>{
   console.log(req.session.user);
    if(req.isAuthenticated()){
        return next();
    }
    res.status(400).json({message : "Not Authenticated"})
}   


module.exports = ensureAuthenticated;