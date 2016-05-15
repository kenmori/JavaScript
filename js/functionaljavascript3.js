//作用的関数プログラミング

//collectionの値に対して関数を実行し、それらの結果を格納したコレクションを返す
var num = [1,2,3,4,5,6,7,8,9,10];
function Double(array){
 var i = array.map(function(n){
 return n*2;
 });
 return i;
}
Double(num);
//[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]


//コレクションのそれぞれの値に対してその値とそれまでに計算された中間結果の値を引数として渡した関数を呼び最終的に一つの値を返す
function average(array){
 var sum = array.reduce(function(a, b){
  return a + b;
});
  return sum / array.length;
}
average(num);
//5.5

//コレクションの値に対しプレディケート関数を呼びtrueを返した値だけ新しいコレクションに格納して返す
function onlyEven(array){
 var even = array.filter(function(n){
  return (n % 2) == 0;
 });
 return even;
}
onlyEven(num);
//[2, 4, 6, 8, 10]
//


//簡単なもじゅーる
const module = (function(){
 var count = 0;
 return {
   add: function(){
    count++;
   },
   show: function(){
    console.log(count);
    }
  };
})();
module.show();
