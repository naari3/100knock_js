function n_gram(n, arg) {
  var list = [];
  var j = 0;
  for (var i = 0; i < Math.ceil(arg.length / (n-1)); i++) {
    list[i] = "";
    for (var k = 0; k < n; k++) {
      if (arg[j+k]) {
        list[i] += arg[j+k];
      }
    }
    j += n-1
  }
  return list;
}

function union(a, b){
  var list = [];
  for (var i = 0; i < a.length; i++) {
    if (list.indexOf(a[i]) === -1){
      list.push(a[i]);
    }
  }
  for (var i = 0; i < b.length; i++) {
    if (list.indexOf(b[i]) === -1){
      list.push(b[i]);
    }
  }
  return list;
}

function difference(a, b) {
  var list = union(a, b);
  var blen = b.length;
  for (var i = 0; i < b.length; i++) {
    for(j=0; j<list.length; j++){
        if(list[j] == b[i]){
            list.splice(j--, 1);
        }
    }
  }
  return list;
}

function intersection(a, b) {
  var list = [];
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (a[i] === b[j]){
        list.push(a[i]);
      }
    }
  }
  list = list.filter(function (n, i, self) {
    return self.indexOf(n) === i; // 説明を下に
  });
  return list;
}

var str1 = "paraparaparadise";
var str2 = "paragraph";

var X = n_gram(2, str1);
var Y = n_gram(2, str2);

console.log(X);
console.log(Y);

var uni = union(X, Y);
var dif = difference(X, Y);
var inte = intersection(X, Y);

console.log("---------------");

console.log(uni);
console.log(dif);
console.log(inte);


// 1,arr = [1,2,3,4,5,3]
// 2,一番前にある引数の場所をarr.indexOf(1)で読み取る
// 3,1の場所は0のため、iは0となり、一番前にある1は0であるため、一致し真が返り、無事arrに残る
// 4,arr内の前から二番目の3(つまりarr[5])の場所は5であるが、一番前にある3は2であるため、falseが返りarrから消える
