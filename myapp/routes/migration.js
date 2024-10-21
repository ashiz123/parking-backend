const express = require('express');
const router = express.Router();

const createTables = require('../migrations/create_schema');
const dropTables = require('../migrations/drop_schema');
const modifyParkingLotTable = require('../migrations/modify_pariking_lot_table');
const pool  = require('../config/database_connection');

// const createParkingLotTable = require('../migrations/create_parking_lot_table');
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
    await dropTables();
    res.status(200).json({message: 'table dropped successfully'});
})

router.get('/modify/parking_lot', async(req, res) => {
    await modifyParkingLotTable(pool);
    res.status(200).json({message: 'table modified successfully'});
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

//To create parking_slots table
// router.get('/parking_spots/up', async(req, res) => {
//     const result = await createParkingSpotTable();
//     if(result.success){
//         res.status(200).json({message: result.message})
//     }else{
//         res.status(500).json({message: "Error creating parking slots table ", error: error.message});
//     }
// })

module.exports = router;