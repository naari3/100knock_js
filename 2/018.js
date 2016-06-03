var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');

var textline = text.split("\n").slice(0,-1);

var dlist = []

var text = "";

for (var i = 0; i < textline.length; i++) {
  console.log(textline[i]);
  dlist.push({temp:textline[i].split("\t")[2], data:textline[i]});
}

dlist.sort(function (a, b){
  if (a.temp < b.temp) {
    return -1
  }
  if (a.temp > b.temp) {
    return 1
  }
  return 0;
})

for (var i = 0; i < dlist.length; i++) {
  console.log(dlist[i]);
  text += dlist[i].data + "\n"
}

console.log(text);
