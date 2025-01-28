const express = require('express');
const router = express.Router();

const createTables = require('../migrations/create_schema');
const dropTables = require('../migrations/drop_schema');
const modifyParkingLotTable = require('../migrations/modify_parking_lot_table');
const modifyParkingSpotTable = require('../migrations/modify_parking_spot_table');
const pool  = require('../config/database_connection');
const createPricingTable = require('../migrations/create_pricing_table');
const createReservationTable = require('../migrations/create_reservation_table');
const createParkingPaymentTable = require('../migrations/create_parking_payment_table');
const addTitleInSpotTable = require("../migrations/add_title_in_spot_table");
const createParkingSectionsTable = require('../migrations/create_parking_sections_table');
const createUserLotSelectionTable = require('../migrations/create_user_lot_selection_table');






router.get('/up', async(req, res) => {
try{
    await createTables();
    res.status(200).json({message : 'table created successfully'});
}
catch(error){
    console.log('Error creating table', error);
    res.status(500).json({ message: 'Failed to create table', error: error.message });
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

router.get('/add_title_in_parking_spot', async(req, res) => {
    try{
        await addTitleInSpotTable(pool);
        res.status(200).json({message : 'Add title in spot'});
    }

    catch(error){
        res.status(500).json({message : error?.message || "An unknown error occured"});
    }
})

router.get('/parking_sections/up', async(req, res) => {
    try{
        const result = await createParkingSectionsTable();
        res.status(200).json({message : result?.message});
    }
    catch(error){
        res.status(500).json({
            message : error?.message || 'An unknow error occured'
        })
    }
})

router.get('/user_lot_activate/up', async(req, res) => {
    try{
        const result = await createUserLotSelectionTable();
        if(result.success){
            res.status(200).json({
                message : 'user lot activate table created successfully'
            })
        }
        throw new Error('Table can not be created');
       
    }
    catch(error){
        console.log(error);
        throw error;
    }
})




module.exports = router;