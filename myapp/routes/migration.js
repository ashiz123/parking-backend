const express = require('express');
const router = express.Router();

const createTables = require('../migrations/create_schema');
const dropTables = require('../migrations/drop_schema');

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

module.exports = router;