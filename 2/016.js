var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');
var argv = parseInt(process.argv[2]);

textline = text.split("\n");

files = Math.ceil(textline.length/argv);

var l = 0;
var fn = 0;
while (l < textline.length) {
  var text = "";
  for (var i = 0; i < argv; i++) {
    if (textline[l]) {
      text += textline[l] + "\n";
    }
    l++;
  }
  fs.writeFileSync("split"+fn+".txt", text);
  fn++;
}
