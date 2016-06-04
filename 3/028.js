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
    m[2] = m[2].replace(/('|"){2,3}/g, "");
    while (true) {
      var n = m[2].match(/\[{2}([^|\]]+?\|)*(.+?)\]{2}/);
      if (n) {
        m[2] = m[2].replace(/\[{2}([^|\]]+?\|)*(.+?)\]{2}/, n[2]);
      } else {
        break;
      }
    }
    while (m[2].match(/\[([^|\]]+?)(| (.+?))\]/)) {
      m[2] = m[2].replace(/\[([^|\]]+?)(| (.+?))\]/, function () {if (m[2].match(/\[([^|\]]+?)(| (.+?))\]/)[2]) { return m[2].match(/\[([^|\]]+?)(| (.+?))\]/)[2] } else { return m[2].match(/\[([^|\]]+?)(| (.+?))\]/)[3] }})
    }

    tempdict[m[1]] = m[2];
  }

  console.log(tempdict);

});
