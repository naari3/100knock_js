var fs = require('fs');
var text = fs.readFileSync('hightemp.txt', 'utf-8');

var textline = text.split("\n").slice(0,-1);

var dlist = []

var text = "";

for (var i = 0; i < textline.length; i++) {
  dlist.push({pref:textline[i].split("\t")[0], temp:textline[i].split("\t")[2], data:textline[i]});
}


dlist.sort(function (a, b){
  if (a.pref < b.pref) {
    return -1
  }
  if (a.pref > b.pref) {
    return 1
  }
  return 0;
})

var preflist = [];
var prefstatus = dlist[0].pref;
var n = 0;
preflist[n] = [];
for (var i = 0; i < dlist.length; i++) {
  if (prefstatus != dlist[i].pref) {
    prefstatus = dlist[i].pref
    n++;
    preflist[n] = [];
  }
  preflist[n].push(dlist[i]);
}

for (var i = 0; i <= n; i++) {
  preflist[n].sort(function (a, b){
    if (a.temp < b.temp) {
      return -1
    }
    if (a.temp > b.temp) {
      return 1
    }
    return 0;
  })
}

preflist.sort(function(a, b){
        if( a.length < b.length ) {
          return 1
        }
        if( a.length > b.length ) {
          return -1
        }
        return 0;
});


console.log(preflist);

for (var i = 0; i < preflist.length; i++) {
  for (var j = 0; j < preflist[i].length; j++) {
    text += preflist[i][j].data + "\n";
  }
}

console.log(text);
