const sectionService = require('../services/parkingSectionService');


class Sectioncontroller{


    async createSection(req, res){

        try{
            const data = await sectionService.createSection(req.body)
            console.log(data);
            res.status(200).json({
                message : 'Parking section created successfully',
                data
            });
        }

        catch(error){
            console.log(error);
            res.json(500).json('Error from controller', error)
        }
        

    }


    async getSectionsByLotId(req, res){
        const {lotId} = req.params;
        try{
            const data = await sectionService.getSectionsByLotId(lotId);
            res.json(data);

        }
        catch(error){
            console.log(error);
            res.json(500).json('Cannot fetch data', error)
        }
    }


    async getSectionBySectionId(req, res){
        const {id} = req.params;
        try{
            const data = await sectionService.getSectionBySectionId(id);
            res.json(data);
        }
        catch(error){
            console.log(error);
            res.json(500).json('Error occured', error);
        }
    }




}

const sectionController = new Sectioncontroller

module.exports = sectionController