function n_gram(n, arg) {
  var list = [];
  var j = 0;
  for (var i = 0; i < Math.ceil(arg.length / (n-1)); i++) {
    if (arg[j+1]){
      list[i] = arg[j] + arg[j+1];
    } else {
      list[i] = arg[j];
    }
    j += n-1
  }
  return list;
}

var moji = "I am an NLPer";
var tango = moji.split(" ");

console.log(n_gram(2, moji));
console.log(n_gram(2, tango));
// 14moji
// 今日はマジでとってもいい天気
// 2:14
// 3:7
// 4:5 (14/(4-1))=4.666
// 5:4
// 6:3
// 7:3 <- 2.333333  !!!! ceilだ！！
