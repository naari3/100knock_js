var fs = require('fs');
var col1 = fs.readFileSync('col1.txt', 'utf-8');
var col2 = fs.readFileSync('col2.txt', 'utf-8');

text = col1+"\t"+col2;
fs.writeFileSync("013.txt", text);
