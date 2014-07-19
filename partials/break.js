function each(ary, func) {
var len = ary.length,
    i;
  for(i = 0; i < len; i++) {
    if(ary[i] && func(ary[i],i,ary))
      break;
  }
}

var a = { b: { c: 6}},
  arr = ["a","b","c","d","e"],
  cache = {},
  count = 0;

each(arr, function(elm, count) {
  cache[elm] = count;
  count += 1;
});


console.log(cache);

/*var g = this, values = "a.b.c";
each( values.split("."), function(pa) {
  g = g[pa];
});
*/
