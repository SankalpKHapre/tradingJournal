const express= require('express');
const router = express.Router();
const {getTrades,addTrades,closeTrade} = require('../Controllers/tradeControllers');
const authMiddleware= require('../middleware/auth');


router.post('/add-trade',authMiddleware,addTrades);
router.get('/trades',authMiddleware,getTrades);
router.put('/close-trade/:id',authMiddleware,closeTrade);

module.exports=router;
