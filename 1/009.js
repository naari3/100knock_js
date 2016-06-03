var tekitou = "I couldn't believe that I could actually understand what I was reading : the phenomenal power of the human mind .";

function fisherYates_shuffle2(array) {
  array = array.split("");
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array.join("");
}

function typoglycemia(str) {
  str = str.split(" ");
  tmp = "";
  list = [];
  for (var i = 0; i < str.length; i++) {
    if (4 < str[i].length) {
      list.push(str[i][0]+fisherYates_shuffle2(str[i].slice(1 ,-1))+str[i][str[i].length]);
    } else {
      list.push(str[i]);
    }
  }
  return list.join(" ");
}

console.log(typoglycemia(tekitou));
