const { parse } = require('dotenv');
const db =require('../dB_config/config');

const addTrades = async(req,res)=>{
    try {
        const{instrument,takeProfit,stopLoss,entry} = req.body;
        const entryP = parseFloat(entry);
        const sl = parseFloat(stopLoss);
        const tp = parseFloat(takeProfit);

        if (!instrument || !entryP || !sl || !tp) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const risk= Math.abs(entryP-sl);
        const reward = Math.abs(tp-entryP);

        const rrRatio = risk == 0 ? 0 : reward/risk;

        const[result] = await db.query("INSERT INTO trades(instrument, entry_price, stop_loss, take_profit,risk,reward,rr_ratio) VALUES(?,?,?,?,?,?,?)",[instrument,takeProfit,stopLoss,entry,risk,reward,rrRatio]);

        res.json({
            id: result.insertId,
            message: "Trade added successfully",
            risk,
            reward,
            rrRatio
        })
        
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

const closeTrade = async(req,res)=>{
    try {
        const tradeId = req.params.id;
        const {exitPrice} = req.body;
        console.log(exitPrice);
        
        const exit = parseFloat(exitPrice);
        const[rows] = await db.query("SELECT * from trades WHERE id=?",[tradeId]);
        if(rows.length==0){
            return res.status(404).json({message:"Trade no found"});
        }
        const trade=rows[0];

        if(trade.status=="closed"){
            return res.status(404).json({message:"Trade is not open"});
        }

        const entry= parseFloat(trade.entry_price);
        const pnl = Number((entry-exit).toFixed(5));

        await db.query("UPDATE trades SET exit_price=?,pnl=?,status=? WHERE id=?",[exit,pnl,"closed",tradeId]);

        res.json({
            message: "Trade closed successfully",
            pnl
        });        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports={getTrades,addTrades,closeTrade}





