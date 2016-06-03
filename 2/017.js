var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');

textline = text.split("\n").slice(0,-1);

for (var i = 0; i < textline.length; i++) {
  textline[i] = textline[i].split("\t")[0]
}

textline = textline.filter(function (n, i, self) {
  return self.indexOf(n) === i; // 説明を下に
});

for (var i = 0; i < textline.length; i++) {
  console.log(textline[i]);
}
