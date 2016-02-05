var express = require('express');
var bodyParser = require('body-parser');
var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

function createTransaction(data) {
  return {
    from : "0xd6c6d752e477d03d99a57af9a7968633ce675a58",
    to: "0x139481340e39dc3278f2f4ff5772ee19068722fa",
    value: 1,
    data: web3.toHex(JSON.stringify(data))
  }
};

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('REST SBT blockchain');
});

app.post('/chain', function(req, res) {
  web3.eth.sendTransaction(createTransaction(req.body),
  function(error, result){
    if(!error)
        res.send(result);
    else
        res.status(500).send(error);
  });
});

app.get('/chain/:transactionId', function(req, res) {
  web3.eth.getTransaction(req.params.transactionId,
  function(error, result){
    if(!error) {
      res.send({ block: result.blockHash, data: JSON.parse(web3.toAscii(result.input)) });
    } else {
      res.status(500).send(error);
    }
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
