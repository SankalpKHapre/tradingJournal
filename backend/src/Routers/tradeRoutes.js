const express= require('express');
const router = express.Router();
const {getTrades,addTrades,closeTrade} = require('../Controllers/tradeControllers');

router.post('/add-trade',addTrades);
router.get('/trades',getTrades);
router.put('/close-trade/:id',closeTrade);

module.exports=router;
