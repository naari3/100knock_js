var str1 = "Now I need a drink, alcoholic of course, after the heavy lectures involving quantum mechanics.";
str1 = str1.replace(/,/g,"").replace(/\./g,"");
str1 = str1.split(" ");

list = [];
for (var i = 0; i < str1.length; i++) {
  list.push(str1[i].length);
}

console.log(list);
