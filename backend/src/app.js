

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./dB_config/config');
// const testDb = require('./testConnection');
const tradeRoutes = require('./Routers/tradeRoutes')
const authRoutes = require('./Routers/authRoutes')

dotenv.config(); // Load environment variables from .env
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use('/api', tradeRoutes);
app.use('/api/auth',authRoutes)


app.get('/',async (req,res)=>{
    try{
        const [rows] = await db.query('SELECT 1')
        res.send("Hello World DB CONNECTED");
        console.log(rows);

    }
    catch(error){
        console.error(error);
        res.status(500).send('Database conection failed');
    }
})




const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> console.log("Server is running"))

// testDb();




