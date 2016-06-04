"use strict";

var fs = require('fs');
var zlib = require('zlib');
var gzipContent = fs.readFileSync('./jawiki-country.json.gz');
var jsons = [];
var categories = [];
var uk;
var uks;
var title;

zlib.gunzip(gzipContent, function (err, binary) {
  var list = binary.toString('utf-8').split("\n");

  for (var li of list.slice(0,-1)) {
    jsons.push(JSON.parse(li));
  }

  for (var json of jsons) {
    if (json.title == 'イギリス') {
      uk = json.text;
      break;
    }
  }

  uks = uk.split("\n");
  for (var u of uks) {
    if (u.match(/\[\[Category:.+\]\]/)) {  // [[Category:イギリス|*]]
      categories.push(u);
    }
  }

  for (var val of categories) {
    title = val.match(/\[\[Category:(.*?)(|(\|)(.+)?)\]\]/)[1];
    console.log(title);
  }
});
