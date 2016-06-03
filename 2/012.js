var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');

text=text.split("\n");
fs.writeFileSync("col1.txt", text[0]);
fs.writeFileSync("col2.txt", text[1]);
