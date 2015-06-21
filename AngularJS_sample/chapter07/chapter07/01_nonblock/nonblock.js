function nonblock(){
  var time = 0;
  setTimeout(function(){
    time = 1000;
    console.log(time);
  }, 1000);
  console.log(time);
  return time;
}
nonblock();
