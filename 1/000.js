var string = "stressed";

var tmp = "";
for (var i = 1; i <= string.length; i++) {
  console.log(string[string.length-i]);
  tmp += string[string.length-i];
}

console.log(tmp);
