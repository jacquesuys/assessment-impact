// Input: "1,3,6,7,8,12,22,14,13,15,21,23,24,31"
// Result: "1,3,6-8,12-15,21-24,31"

var numSummarize = function(str) {

  var result = str.split(',').map(Number).sort(function(a, b){
    return a - b;
  });

  var recurse = function(start, end) {
    
    if (result[end + 1] !== result[end] + 1) {
      var str = result[start] + '-' + result[end];
      return result.splice(start, end - start + 1, str);
    }
    
    recurse(start, end + 1);
  };

  var i = 0, current, next;

  for (i; i < result.length; i++) {
    current = result[i]; 
    next = result[i + 1];

    if (current + 1 === next) {
      recurse(i, i);
    }
  }
  
  return result.join(',');
}

numSummarize("1,3,6,7,8,12,22,14,13,15,21,23,24,31");