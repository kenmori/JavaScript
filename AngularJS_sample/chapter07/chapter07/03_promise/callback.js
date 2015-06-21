function callbackFunc(msg){
  console.log(msg);
}
function async(msg, callback){
  callback(msg);
}
async('Hello', callbackFunc);
