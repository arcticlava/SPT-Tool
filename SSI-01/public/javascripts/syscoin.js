const SyscoinRpcClient = require("@syscoin/syscoin-js").SyscoinRpcClient;
const rpcServices = require("@syscoin/syscoin-js").rpcServices;
//const guid = 964836217;
const guid = 783790339;
const config = {
  host: "localhost",
  rpcPort: 8368,
  username: "u",
  password: "p",
  logLevel: 'error',
  timeout: 30000
};
const client = new SyscoinRpcClient(config);

async function currentHash(){
  var resultpromise = rpcServices(client.callRpc).getBestBlockHash().call(true);
  var result = await resultpromise;
  console.log(result);
  return result;
}
module.exports.currentHash = currentHash;

async function currentBlockHeight(){
  var resultpromise = rpcServices(client.callRpc).getBlockchainInfo().call(true);
  var result = (await resultpromise).blocks;
  console.log(result);
  return result;
}
module.exports.currentBlockHeight = currentBlockHeight;

async function guidDescription(){
  const resultpromise = rpcServices(client.callRpc).assetInfo(guid).call(true);
  const result = new Array();
  result[0] = (await resultpromise).public_value;
  result[1] = (await resultpromise).symbol;
  result[2] = (await JSON.parse(result[0])).description;
  console.log(result[0]);
  console.log(result[1]);
  console.log(result[2]);
  return result;
}
module.exports.guidDescription = guidDescription;

async function assetSendSignBroadcast(){
  var sysdidguid = 1288639315;
  var addr = "sys1qz5le2zzsr74tr3u75q7tmay6l5c8hlgfte4wm3";
  var amt = 1; 

  const resultpromise1 = rpcServices(client.callRpc).assetSend(sysdidguid, addr, amt).call(true);
    try{
      var rawtx = (await resultpromise1);
      console.log("THE RAW TX IS: ");
      console.log(rawtx.hex);
    } catch (error) {
      console.log(error);
    }

  const resultpromise2 = rpcServices(client.callRpc).signRawTransactionWithWallet(rawtx.hex).call(true);
  try{
    var signedtx = (await resultpromise2);
    console.log("THE SIGNED TX IS: ");
    console.log(signedtx.hex);
  } catch (error) {
    console.log(error);
  }

  const resultpromise3 = rpcServices(client.callRpc).sendRawTransaction(signedtx.hex).call(true);
  try{
    var txid = (await resultpromise3);
    console.log("THE FINAL TXID IS: ");
    console.log(txid);
  } catch (error) {
    console.log("Holy");
    console.log(error);
  }
  return signedtx.hex;
}
module.exports.assetSendSignBroadcast = assetSendSignBroadcast;

async function receiveBroadcast(){
  var sysdidguid = 1288639315;
  const resultpromise4 = rpcServices(client.callRpc).assetAllocationInfo(sysdidguid, "sys1q49dusr95vlwh5k477m239uwm48vppuns6xtl3a").call(true);
  try{
    var result = (await resultpromise4).balance;
    //console.log('Here is the amount of CERNER tokens I have: ');
    //console.log(result);
  } catch (error) {
    console.log("THE FOLLOWING ERROR WAS CAUGHT BY THE RECEIVEBROADCAST FUNCTION: ");
    console.log(error);
  }
  return result;
}
module.exports.receiveBroadcast = receiveBroadcast;
