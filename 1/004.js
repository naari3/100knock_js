var str1 = "Hi He Lied Because Boron Could Not Oxidize Fluorine. New Nations Might Also Sign Peace Security Clause. Arthur King Can.";
var str1 = str1.replace(/\./g,"").split(" ");

var dict = {};
var arr = [1, 5, 6, 7, 8, 9, 15, 16, 19];

for (var i = 0; i < str1.length; i++) {
  if (arr.indexOf(i+1) >= 0){
    dict[str1[i][0]] = i+1;
  } else {
    dict[str1[i][0]+str1[i][1]] = i+1;
  }
}

console.log(dict);
