function cipher(str) {
  var tmp = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/)) {
      tmp += String.fromCharCode(219-(str[i].charCodeAt(0)));
    } else {
      tmp += str[i];
    }
  }
  return tmp;

}

console.log(cipher("gujhajhjuhghjbvfghjbvf56789GHJHAGSHJDHG678"));
