const { parse } = require('dotenv');
const db =require('../dB_config/config');

const addTrades = async(req,res)=>{
    try {
        const{instrument,takeProfit,stopLoss,entry,trade_type} = req.body;
        const user_id = req.user.id;

        console.log(req.user);
        
        const entryP = parseFloat(entry);
        const sl = parseFloat(stopLoss);
        const tp = parseFloat(takeProfit);



        if (!instrument || !entryP || !sl || !tp) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const risk= Math.abs(entryP-sl).toFixed(5);
        const reward = Math.abs(tp-entryP).toFixed(5);

        const rrRatio = risk == 0 ? 0 : reward/risk;
        
        const[result] = await db.query("INSERT INTO trades(instrument, entry_price, stop_loss, take_profit,risk,reward,rr_ratio,trade_type,user_id) VALUES(?,?,?,?,?,?,?,?,?)",[instrument,entry,stopLoss,takeProfit,risk,reward,rrRatio,trade_type,user_id]);

        res.json({
            id: result.insertId,
            message: "Trade added successfully",
            risk,
            reward,
            rrRatio,
            trade_type
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Error inserting trade");
    }
}

const getTrades = async(req,res)=>{
     try {
        const user_id = req.user.id
        const [rows] = await db.query("SELECT * FROM trades WHERE user_id=?",[user_id]);
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
        let pnl
        if (trade.trade_type=='BUY') {
            pnl=exit-entry;
        }
        else if (trade.trade_type=='SELL') {
            pnl =entry-exit
        }
        
        pnl = Number((pnl).toFixed(5));

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





