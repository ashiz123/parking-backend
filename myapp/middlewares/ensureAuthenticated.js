
const ensureAuthenticated = (req, res, next) =>{

    if(req.isAuthenticated()){
        return next();
    }
    console.log('not authenticated');
    res.status(400).json({message : "Not Authenticated"})
}   


module.exports = ensureAuthenticated;