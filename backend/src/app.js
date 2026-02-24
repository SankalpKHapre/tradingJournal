

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./dB_config/config');
const testDb = require('./testConnection');


dotenv.config(); // Load environment variables from .env
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

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

app.post('/add-trade',async(req,res)=>{
    try {
        const {instrument,entry,stopLoss,takeProfit} = req.body;

        const [result] = await db.query(
            `INSERT INTO trades(instrument,entry_price,stop_loss,take_profit) 
            values(?,?,?,?)`,[instrument,entry,stopLoss,takeProfit]

        );

        res.json({message:"Trade Added",id: result.insertId});
    } catch (error) {
        console.error(error);
        res.status(500).send("Error Inserting Trades");

    }
})


app.get('/trades',async(req,res)=>{
    try {
        const [rows] = await db.query("SELECT * FROM trades");
        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR Fetching details");

    }
})


const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> console.log("Server is running"))

testDb();




