const Spot = require('../models/spot');

class ParkingSpotServices {

    async addParkingSpot(data)
    {
        try{
            const spotId = Spot.addParkingSpot(data);
            if(!spotId){
                throw new Error('Failed to create parking spot')
            }

            return spotId;

        }
        catch(error)
        {
            throw error
        }
    }





}

const parkingSpotService = new ParkingSpotServices()

module.exports = parkingSpotService;