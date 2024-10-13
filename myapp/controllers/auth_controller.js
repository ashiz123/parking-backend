
const passport = require('../config/passport_config'); //passport configuration
const authenticateModel = require('../models/authentication');


class AuthController{

    async registerUser(req, res){
        
        try{
            const {firstname, lastname, email, password} = req.body;
            
            if(!firstname || !lastname || !email || !password){
                console.log('Some input are left empty. All required');
                return res.status(400).json({message: "All input are required"});
            }

            const userId = await authenticateModel.registerUser(firstname, lastname, email, password);
            return res.status(200).json({message: "User created successfully", userId});

        }
        catch(error){
            console.error('Error creating user', error);
           return res.status(500).json({message : 'error creating user', error});
        }
        
       
    }


    async loginUser(req, res, next){
        passport.authenticate('local', (err, user, info) => {
        
            if(err){
                return next(err);
            }
            
            if(!user)
            {
                return res.status(400).json({message: info.message})
            }
    
            req.logIn(user, (err) => {
                if(err){
                    return next(err)
                }
    
                return res.status(200).json({ message: 'User logged in successfully', user: req.user })
            })
        })(req, res, next);  // This ensures passport.authenticate is executed immediately
    }





async profile(req, res){
    console.log('controller')
   res.json({ message: 'Profile data', user: req.user });
}

async logoutUser(req, res){
    console.log(req);
    await req.logout((err) => {
        if(err){
            return res.status(500).json({message : 'Error Logging out'})
        }
        res.json({message: 'Logged out successfully'})
    })
}









}


const authController = new AuthController;

module.exports = authController;

