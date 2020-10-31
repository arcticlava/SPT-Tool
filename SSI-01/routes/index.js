var express = require('express');
var router = express.Router();
var syscoin = require('../public/javascripts/syscoin');

router.get('/', async function(req, res, next) {
  let hash = await syscoin.currentHash();
  let block = await syscoin.currentBlockHeight();
  let sptarray = await syscoin.guidDescription();
  let t_stamp = Date.now();
  let n_date = new Date();
  res.render('index', { 
    symbol: sptarray[1], 
    description: sptarray[2], 
    hash: hash, 
    block: block, 
    t_stamp: t_stamp, 
    n_date: n_date
  });
});

router.get('/sendspt', async function(req, res, next) {
  let raw = await syscoin.assetSendSignBroadcast();
  let baseline0 = await syscoin.receiveBroadcast();
  
  var i;
  for (i = 0; i < 5; i++) {
    let baseline1 = await syscoin.receiveBroadcast();
    console.log(baseline1);
  }

  res.render('sendspt', { 
    baseline0: baseline0
  });
});

module.exports = router;