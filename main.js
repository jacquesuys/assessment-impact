$(document).ready(function(){

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

  var listItems = function(predicate) {

    cocktailShakerShort(data, predicate);

    var $html = '';

    $('.container').empty();

    $.each(data, function(i) {
      $html += '<div class="item" data-id="' + data[i]["id"] + '">';
        $html += '<div>' + data[i]["last_name"] + ', ' + data[i]["first_name"] + '</div>';
        $html += '<div>' + data[i]["gender"] + ', <a href="mailto:' + data[i]["email"] + '">' + data[i]["email"] + '</a></div>';
      $html += '</div>';
    });

    $('.container').html($html);

    console.log(data);
  }

  listItems("last_name");

  $(".sort").change(function() {
    var pred = $(this).val();
    listItems( pred );
  });
});