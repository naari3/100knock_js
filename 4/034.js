// mecabの出したものの形式 is -> 表層形\t品詞,品詞細分類1,品詞細分類2,品詞細分類3,活用形,活用型,原形,読み,発音

// １配列ごとに1文中の単語の各形態素「表層形（surface），基本形（base），品詞（pos），品詞細分類1（pos1）をキーとするマッピング型」が入っている
function n_gram(n, arg) {
  var list = [];
  var j = 0;
  for (var i = 0; i < Math.ceil(arg.length / (n-1)); i++) {
    list[i] = [];
    for (var k = 0; k < n; k++) {
      if (arg[j+k]) {
        list[i].push(arg[j+k]);
      }
    }
    j += n-1
  }
  return list;
}

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

var map_lists = [];
var map_list = [];

for (var maps of mapss) {
  if (maps.length == 0) {
    continue;
  }
  for (var map of maps) {
    map_list.push(map);
  }
  map_lists.push(map_list);
  var map_list = [];
}

var a_no_b = [];
for (var map_list of map_lists) {
  for (var ng of n_gram(3, map_list)) {
    if (ng.length === 3) {
      if (ng[0].pos=="名詞" && ng[1].surface=="の" && ng[2].pos=="名詞") {
        a_no_b.push(ng[0].surface+ng[1].surface+ng[2].surface);
      }
    }
  }
}

console.log(a_no_b);
