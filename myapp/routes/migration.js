const express = require('express');
const router = express.Router();

const createTables = require('../migrations/create_schema');
const dropTables = require('../migrations/drop_schema');
const modifyParkingLotTable = require('../migrations/modify_pariking_lot_table');
const modifyParkingSpotTable = require('../migrations/modify_parking_spot_table');
const pool  = require('../config/database_connection');
const createPricingTable = require('../migrations/create_pricing_table');
const createReservationTable = require('../migrations/create_reservation_table');
const createParkingPaymentTable = require('../migrations/create_parking_payment_table');
// const createParkingSpotTable = require('../migrations/create_parking_spot_table');



router.get('/up', async(req, res) => {
try{
    await createTables();
    res.status(200).json({message : 'table created successfully'});
}
catch(error){
    console.log('Error creating table', error)
}
    
})

router.get('/down', async(req,res) => {
    try{
        await dropTables();
        res.status(200).json({message: 'table dropped successfully'});
    }catch(error)
    {
        console.log(error);
    }
    
})



//To modify table parking_lot temporary use
router.get('/parking_lot/modify', async(req, res) => {
    await modifyParkingLotTable(pool);
    res.status(200).json({message: 'table modified successfully'});
})

router.get('/parking_spots/modify', async(req, res) => {
    try{
        await modifyParkingSpotTable(pool);
        res.status(200).json({
        message : 'parking spot table modified successfully'
        })
    }
    catch(error){
        console.log(error);
        res.json(500).json({
            message: 'Error modifying parking spot',
            error: error.message
        });
    }
    
})



//Route to creating parking price table
router.get('/parking_price/up', async(req,res) => {
try{
    const result = await createPricingTable();
    console.log(result.message);
    res.status(200).json({
        success : true,
        message : result.message
    })
}
catch(error){
   res.status(500).json({
        success: false,
        message: 'Failed to create parking pricing table',
        error: error?.message || 'An unknown error occurred',  // Use optional chaining and fallback
    });
}
})

router.get('/parking_reservation/up', async(req, res) => {
    try{
        const result = await createReservationTable();
        console.log(result.message);
        res.status(200).json({
            success: true,
            message: result.message
        })
    }
    catch(error){
        console.log('migration, ', error.message);
        res.status(500).json({
            success: false,
            message: "failed to create the parking reservation table",
            error: error?.message || "An unknown error occured"
        })
    }
});

router.get('/parking_payments/up', async(req, res) => {
    try{
        const result = await createParkingPaymentTable();
        console.log('routes' , result.message);
        res.status(200).json({
            success: true,
            message : result.message
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            message : error?.message || "An unknown error occured"
        })

    }
})


// To create parking_lots table
// router.get('/parking_lot/up', async(req, res) => {

//     try{
//         const result = await createParkingLotTable();
//         if(result.success){
//             res.status(200).json({message : result.message});
//         }else{
//             res.status(400).json({message : result.message})
//         }
       
//     }
//     catch(error){
//         console.error('Error occurred:', error); // Log the error for debugging
//         res.status(500).json({ message: "Error creating Parking Lot table", error: error.message });
//     }
// })

// To create parking_slots table
// router.get('/parking_spots/up', async(req, res) => {
//     const result = await createParkingSpotTable(pool);
//     if(result.success){
//         res.status(200).json({message: result.message})
//     }else{
//         res.status(500).json({message: "Error creating parking slots table ", error: error.message});
//     }
// })

module.exports = router;