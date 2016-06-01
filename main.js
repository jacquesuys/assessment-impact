$(document).ready(function(){
  var $html;

  // pseudo taken from wikipedia: https://en.wikipedia.org/wiki/Cocktail_shaker_sort
  var swapped, current, next;
  var cocktailShakerShort = function(arr, predicate) {
    do {
      swapped = false;

      for (var i = 0; i < arr.length - 1; i++) {
        current = arr[i][predicate];
        next = arr[i + 1][predicate];
        if (current > next) {
          var temp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = temp;
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
      swapped = false;
      for (var i = 0; i < arr.length - 1; i++) {
        current = arr[i][predicate];
        next = arr[i + 1][predicate];
        if (current > next) {
          var temp = arr[i + 1];
          arr[i + 1] = arr[i];
          arr[i] = temp;
          swapped = true;
        }
      }
    }
    while(swapped);
  }

  cocktailShakerShort(data, "last_name");

  $.each(data, function(i){
    console.log(data[i]);
  });
});