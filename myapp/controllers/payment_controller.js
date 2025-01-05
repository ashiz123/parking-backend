
const stripeService = require('../services/stripeService');


const createPaymentIntent = async(req,res) => {
    try{
       const {charged_amount} = req.body;
       const paymentIntent = await stripeService.createPaymentIntent(charged_amount);
       console.log(paymentIntent);
       res.send({clientSecret : paymentIntent.client_secret});

    }

    catch(error){
        res.status(400).send({
            error : error.message
        })
    }   
}

module.exports = {
    createPaymentIntent
}





