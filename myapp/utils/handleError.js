
const handleError = (res, error) => {
    console.log('Error occured', error);
            return res.status(500).json({
                message: 'An error occurred while creating the parking spot',
                error: error.message || 'Unknown error'
            });
}


module.exports = {handleError};