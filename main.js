$(document).ready(function(){

  // pseudo taken from wikipedia: https://en.wikipedia.org/wiki/Cocktail_shaker_sort
  var cocktailShakerSort = function(arr, predicate) {
    var swapped, current, next;
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

    page = page || 0;

    // don't sort if page is greater than 0
    if (!page) {
      cocktailShakerSort(data, predicate);
    }

    list = data.slice((page * 25), page * 25 + 25);

    var $html = '';
    $('.container').empty();

    for (var i = 0; i < list.length; i++) {
      $html += '<div class="item" data-id="' + list[i]["id"] + '">';
        $html += '<div>' + list[i]["last_name"] + ', ' + list[i]["first_name"] + '</div>';
        $html += '<div>' + list[i]["gender"] + ', <a href="mailto:' + list[i]["email"] + '">' + list[i]["email"] + '</a></div>';
      $html += '</div>';
    }

    $('.container').html($html);

    // TODO: use these log to test the length and the contents of the page listings
      // console.log(list);
      // console.log(list.length);
  }

  listItems("last_name");

  $(".sort").change(function() {
    var pred = $(this).val();
    counter = 0;
    listItems( pred );
  });

  var counter = 0;
  var pred = $('.sort').val();

  $('#next').on('click', function(){
    if (counter < 19) 
      listItems(pred, Math.min(++counter, data.length / 25 - 1)); 
  });

  $('#prev').on('click', function(){
    if (counter > 0) 
      listItems(pred, Math.max(--counter, 0));
  });

  $('body').on('keydown', function(e) {
    if (e.which === 37 && counter > 0) 
      listItems(pred, Math.max(--counter, 0));
      
    if (e.which === 39 && counter < 19) 
      listItems(pred, Math.min(++counter, data.length / 25 - 1));
  });

  var findID = function(list, key, val) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][key] === val) {
        return true;
      }
    }
    return false;
  };

  $('.search').on('keyup', function(){
    var $val = $(this).val();
    var i, key, str, regex, result, $html = '';
    var search = [];

    $('.results').empty();

    if ($val.length > 2) {
      for (i = 0; i < data.length; i++) {
        for (key in data[i]) {
          str = data[i][key];
          regex = new RegExp($val, 'gi');
          result = regex.test(str);
          // if result true and the ID does't exist in search array...
          if (result && !findID(search, "id", data[i].id)) {
            search.push(data[i]);
          }
        }
      }

      for (i = 0; i < search.length; i++) {
        $html += '<li>';
          $html += '<div>' + search[i]["last_name"] + ', ' + search[i]["first_name"] + '</div>';
          $html += '<div>' + search[i]["gender"] + ', ' + search[i]["email"] + '</div>';
        $html += '</li>';
      }

      $('.results').html($html);
    } else {
      $('.results').empty();    
    }

  });

});