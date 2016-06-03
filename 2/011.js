var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');

text = text.replace(/\t/g," ");
console.log(text);
fs.writeFileSync("011.txt", text);
