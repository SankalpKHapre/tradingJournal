const express= require('express');
const router = express.Router();
const {getTrades,addTrades} = require('../Controllers/tradeControllers');

router.post('/add-trade',addTrades);
router.get('/trades',getTrades);

module.exports=router;
