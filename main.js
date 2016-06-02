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

  var listItems = function(predicate, page) {
    cocktailShakerShort(data, predicate);

    page = page || 0;
    list = data.slice(page * 25, page * 25 + 26);

    var $html = '';
    $('.container').empty();

    for (var i = 0; i < list.length; i++) {
      $html += '<div class="item" data-id="' + list[i]["id"] + '">';
        $html += '<div>' + list[i]["last_name"] + ', ' + list[i]["first_name"] + '</div>';
        $html += '<div>' + list[i]["gender"] + ', <a href="mailto:' + list[i]["email"] + '">' + list[i]["email"] + '</a></div>';
      $html += '</div>';
    }

    $('.container').html($html);

    console.log(list);
  }

  listItems("last_name");

  $(".sort").change(function() {
    var pred = $(this).val();
    listItems( pred );
  });

  var counter = 0;
  var pred = $('.sort').val();

  $('#next').on('click', function(){
    listItems(pred, Math.min(++counter, data.length / 25));
  });

  $('#prev').on('click', function(){
    listItems(pred, Math.max(--counter, 0));
  });

});