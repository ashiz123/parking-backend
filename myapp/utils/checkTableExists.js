
/**
 * Check if a table exists in the database.
 * @param {string} tableName - The name of the table to check.
 * @returns {Promise<{ success: boolean, message: string }>}
 */


const checkTableExists = async(tableName, client) => {
  
    const tableCheckQuery = `
        SELECT COUNT(*) AS count 
        FROM information_schema.tables
        WHERE table_schema = 'parking_app'
        AND table_name = ? ;
        `;
         try{
            const [rows] = await client.query(tableCheckQuery, [tableName]);
           
            if(rows[0].count > 0){
                console.log(`${tableName} already exists.`);
                return {success: true, message : `${tableName} already exists`};
            }else{
                console.log(`${tableName} is not exists`);
                return {success: false, message: `${tableName} is not exists`};
            }
        }
        catch(error){
            console.error('Error checking table existence:', error);
            throw new Error(`Error checking table ${tableName} existence: ${error.message}`);
        }
       


}


module.exports = checkTableExists;