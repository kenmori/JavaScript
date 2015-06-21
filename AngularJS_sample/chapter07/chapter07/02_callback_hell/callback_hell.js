function hell(){
  var time = 0;
  setTimeout(function(){
    time += 1000;
    console.log(time);
    setTimeout(function(){
      time += 1000;
      console.log(time);
      setTimeout(function(){
        time += 1000;
        console.log(time);
      });
    });
  }, 1000);
}
hell();
