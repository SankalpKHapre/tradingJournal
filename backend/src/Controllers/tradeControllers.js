const db =require('../dB_config/config');

const addTrades = async(req,res)=>{
    try {
        const{instrument,takeProfit,stopLoss,entryPrice} = req.body;
        const[result] = await db.query("INSERT INTO trades(instrument, entry_price, stop_loss, take_profit) VALUES(?,?,?,?)",[instrument,takeProfit,stopLoss,entryPrice]);
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Error inserting trade");
    }
}

const getTrades = async(req,res)=>{
     try {
        const [rows] = await db.query("SELECT * FROM trades");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching trades");
    }
}

module.exports={getTrades,addTrades}