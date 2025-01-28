
const ParkingLotLoginService = require("../services/parkiingLotLoginService");
const parkingLotServices = require("../services/parkingLotServices");
const { handleError } = require("../utils/handleError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();  





class LotAuthController {

    constructor() {
        this.jwtSecret = process.env.LOT_AUTH_JWT_SECRET_KEY;
        this.loginParkingLot = this.loginParkingLot.bind(this); //using bind to use this.jwtSecret in this function.
       

    }


    async loginParkingLot(req, res){
       
        const {lot_name, lot_pin} = req.body;
        const JWT_SECRET =  this.jwtSecret
        try{
            const lot = await ParkingLotLoginService.loginLot(lot_name);
        
            //check lot exist
            if(lot.length === 0){
                res.status(400).json({message : 'invalid lot name or pin'})
            }

            const id = lot.id

            //check password match
            const match= await bcrypt.compare( lot_pin, lot.login_pin);
            if(!match){
                return res.status(401).json({
                    message : 'Invalid lot name or pin'
                })
            }

            //Generate token
            const token = jwt.sign({id}, JWT_SECRET, {expiresIn: '1h'});
            res.json({message : 'login successfully' , token})
        }
        catch(error){
            console.log(error);
            handleError(res, error)
        }
    }

    async getLot(req, res){

        const lotId = req.lot.id;
        console.log(lotId);

        try{    
            const lot = await parkingLotServices.getParkingLotByLotId(lotId);
            console.log(lot);
            res.json(lot);
        }
        catch(error){
            console.log(error);
            handleError(res, error);
        }
       
    }


    

}


module.exports = new LotAuthController();