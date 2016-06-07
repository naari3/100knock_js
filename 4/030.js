// mecabの出したものの形式 is -> 表層形\t品詞,品詞細分類1,品詞細分類2,品詞細分類3,活用形,活用型,原形,読み,発音

// 形態素解析結果（neko.txt.mecab）を読み込むプログラムを実装せよ．
// ただし，各形態素は表層形（surface），基本形（base），品詞（pos），品詞細分類1（pos1）をキーとするマッピング型に格納し，
// 1文を形態素（マッピング型）のリストとして表現せよ

// 一	名詞,数,*,*,*,*,一,イチ,イチ
// EOS
// EOS
// 　	記号,空白,*,*,*,*,　,　,　
// 吾輩	名詞,代名詞,一般,*,*,*,吾輩,ワガハイ,ワガハイ
// は	助詞,係助詞,*,*,*,*,は,ハ,ワ
// 猫	名詞,一般,*,*,*,*,猫,ネコ,ネコ
// で	助動詞,*,*,*,特殊・ダ,連用形,だ,デ,デ
// ある	助動詞,*,*,*,五段・ラ行アル,基本形,ある,アル,アル
// 。	記号,句点,*,*,*,*,。,。,。
// EOS

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

console.log(mapss);
