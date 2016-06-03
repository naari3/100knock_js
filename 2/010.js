var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');

console.log(text.split("\n").length - 1);
