var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');
var argv = parseInt(process.argv[2]);
var out = "";

text = text.split("\n");
for (var i = text.length - argv -1; i < text.length -1; i++) {
  out += text[i] + "\n"
}

console.log(out);


20
5
15
