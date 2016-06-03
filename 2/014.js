var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');
var argv = parseInt(process.argv[2]);
var out = "";

text = text.split("\n");
for (var i = 0; i < argv; i++) {
  out += text[i] + "\n"
}

console.log(out);
