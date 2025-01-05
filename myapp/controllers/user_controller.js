
const userModel = require('../models/user');



class UserController{

async register(req, res){
    try{
    
    const{first_name, last_name, email, password} = req.body;

    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    const userId = await userModel.createUser(first_name, last_name, email, password);
    return res.status(200).json({message : "User created successfully", userId})
   }

    catch(error)
    {
        console.error('Error creating user', error);
        return res.status(500).json({message : 'error creating user', error});
    }


}
}

const userController = new UserController

module.exports = userController;
