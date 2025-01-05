const parkingSectionModel = require('../models/section');

class ParkingSectionService {

    async createSection(data){
       const sectionService =  parkingSectionModel.createSectionModel(data)
       console.log(sectionService);
       return sectionService;
    }

    async getSectionsByLotId(lotId){
        try{
            const sections = parkingSectionModel.getSectionsByLotId(lotId);
            console.log( sections);
            return sections;
        }
        catch(error){
            console.log(error);
        }
       
    }

    async getSectionBySectionId(id){
        try{
            const section = parkingSectionModel.getSectionBySectionId(id);
            console.log(section);
            return section;
        }
        catch(error){
            console.log(error);
        }
    }

    async updateSection(){

    }

}


const sectionService = new ParkingSectionService();
module.exports = sectionService;