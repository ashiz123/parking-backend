const express = require('express')
const cors = require('cors');
// const dotenv = require('dotenv');
const database = require('./myapp/config/database_connection');
const app = express()
const PORT = 3000
const userRoutes = require('./myapp/routes/user');
const migrationRoutes = require('./myapp/routes/migration');


//middleware
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes)
app.use('/migration', migrationRoutes);



app.get('/', (req, res) => {
  res.send('testing World is again tested!')
})





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


