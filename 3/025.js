"use strict";

var fs = require('fs');
var zlib = require('zlib');
var gzipContent = fs.readFileSync('./jawiki-country.json.gz');
var jsons = [];
var files = [];
var uk;
var template;
var temps;
var tempdict = {};

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

  template = uk.match(/\{\{基礎情報 国\n\|((.*?\n){1,})\}\}\n/)[1];
  temps = template.split("\n|");
  for (var u of temps) {
    var m = u.match(/(.*?) = (.*)/);
    tempdict[m[1]] = m[2];
  }

  console.log(tempdict);

});
