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

var word_count = {};
for (var map_list of map_lists) {
  for (var map of map_list) {
    if (word_count[map.surface] === undefined) {
      word_count[map.surface] = 1;
    } else {
      word_count[map.surface] += 1
    }
  }
}

word_freqs = [];

var keys = Object.keys(word_count);
for (var i = 0; i < keys.length; i++) {
  word_freqs.push({word:keys[i], count:word_count[keys[i]]});
}
// word_freqs[57] = { word: 'この', count: 649 }

var tmp = {}; // word count freq s
for (var freq of word_freqs) {
  if (tmp[freq.count] === undefined) {
    tmp[freq.count] = 1;
  } else {
    tmp[freq.count] += 1
  }
}

var wcfs = []; // word count freq s
var keys = Object.keys(tmp);
for (var i = 0; i < keys.length; i++) {
  wcfs.push({freq:keys[i], num:tmp[keys[i]]});
}

wcfs = wcfs.sort(function(a, b){
   if (a.num > b.num) {
     return -1
   }
   if (a.num < b.num) {
     return 1
   }
   return 0;
 });

var gnu_xtics = "(";
var gp_num = 1;
var gp_plot = "";
for (var i = 0; i < wcfs.length; i++,gp_num++) {
  gnu_xtics += '"'+wcfs[i].freq+'"'+" "+gp_num+", "  // 「"単語" gnu_num, 」これを追加してる
  // gp_plot += '"'+word_freqs[i].word+'",'+word_freqs[i].count+'),(';
  gp_plot += gp_num+", "+wcfs[i].num+"\n"
}
gnu_xtics = gnu_xtics.slice(0,-2);
gnu_xtics += ")"
gp_plot += "e"

var gnuplot = require('gnuplot');
var gp = gnuplot();
gp
    .set('term png font "Osaka,14"')
    .set('output "plots/038.png"')
    .set('title "38. ヒストグラム')
    .set('xrange [0:50]')
    .set('grid')
    // .set('xtics '+gnu_xtics)
    .set('xlabel "出現頻度"')
    .set('ylabel "出現頻度をとる単語の種類数"')
    .set('style fill solid border lc rgb "black"')
    .plot('"-" with boxes notitle lc rgb "blue" \n'+gp_plot)
    .end();
