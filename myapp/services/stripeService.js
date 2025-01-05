const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
/**
 * 
 * @param {number} amount 
 * @param {string} currency 
 * @param {string} paymentMethodId 
 * @returns {object}
 */

 const createPaymentIntent = async(charged_amount) => {
    try{
        const paymentIntent =  await stripe.paymentIntents.create({
           amount : charged_amount,
           currency  : 'usd',
           payment_method_types : ['card']
        });
        return paymentIntent;
    
    }
    catch(error){
        console.log(error);
        throw new Error('Error creating payment intent: ' + error.message);
    }
    

}

module.exports = {
    createPaymentIntent
}
