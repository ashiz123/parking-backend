const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.LOT_AUTH_JWT_SECRET_KEY;



const authenticateLot = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; //split authorization header as array. and take index 1 which is token.
    if(!token) return res.status(401).json({message : 'Access denied'});

    try{
        const verified = jwt.verify(token,JWT_SECRET);
        console.log('verify', verified);
        req.lot = verified; //verified user
        next();
    }
    catch(error){
        console.log(error);
        res.status(403).json({message : 'Invalid Token'});
    }
    
}


module.exports = authenticateLot