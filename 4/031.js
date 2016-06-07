// mecabの出したものの形式 is -> 表層形\t品詞,品詞細分類1,品詞細分類2,品詞細分類3,活用形,活用型,原形,読み,発音

// １配列ごとに1文中の単語の各形態素「表層形（surface），基本形（base），品詞（pos），品詞細分類1（pos1）をキーとするマッピング型」が入っている
var fs = require('fs');
var text = fs.readFileSync('neko.txt.mecab', 'utf-8');

var lines = text.split("EOS"); // 1文(EOS)ごとにsplit

// console.log(lines[2]);


var mapss = [];

for (var l of lines) {
  var maps = [];
  if (l.length !== 1) {
    var lsp = l.split("\n");
    for (var sen of lsp) {
      var map = {};
      if (sen == '') {
        continue;
      }
      var sen_split = sen.split("\t");
      map["surface"] = sen_split[0];
      map["base"] = sen_split[1].split(",")[6];
      map["pos"] = sen_split[1].split(",")[0];
      map["pos1"] = sen_split[1].split(",")[1];
      maps.push(map);
    }
  }
  mapss.push(maps);
}

var doushi_surface = [];

for (var maps of mapss) {
  for (var map of maps) {
    if (map.pos == "動詞") {
      doushi_surface.push(map.surface);
    }
  }
}

console.log(doushi_surface);
