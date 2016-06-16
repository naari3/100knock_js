"use strict"
/*
アスタリスク付きで追加した行はこのようになっている。

* 2 -1D 0/2 0.000000
便宜的にアスタリスクの次から項目1,項目2,項目3,項目4と呼称する。
項目1は文節番号である。この場合では3番目(0からはじまるため)となっている。
項目2は係り先番号である。この場合は-1となっており、係られているだけでどこにも係っていないことを示す。
項目3は主辞と機能語の位置を示している。この場合は文節内の1番目が主辞/3番目が機能語となっている。
項目4は係関係のスコアである。
*/
var fs = require('fs');
var text = fs.readFileSync('neko.txt.cabocha', 'utf-8');
var lines = text.split("\n").slice(0,-1); // ブロックごとにわける

class Chunk{
  constructor(morphs, dst, srcs) {
    this.morphs = morphs;
    this.dst = dst;
    this.srcs = srcs;
  }
}

class Morph{
  constructor(surface, base, pos, pos1) {
    this.surface = surface;
    this.base = base;
    this.pos = pos;
    this.pos1 = pos1;
  }
}

var dst_srcs = [];
var dst;
var src;

var morphs = [];
var chunks = [];
var chunk_morphs = [];
var _cuhnk = new Chunk([],0,[]);
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf("*") === 0) {
    if (morphs.length !== 0) {
      chunk_morphs.push(morphs);
    }
    morphs = [];
    morphs.push(lines[i]);
  } else if (lines[i] === "EOS") {
    if (chunk_morphs.length !== 0) {
      console.log(chunk_morphs);
      chunks.push(chunk_morphs);
    }
    morphs = [];
    chunk_morphs = [];
  }else {
    var spl = lines[i].split("\t");
    var splt = spl[1].split(",");
    morphs.push(new Morph(spl[0],splt[6],splt[0],splt[1]));
  }
}

console.log(chunks[1]);
