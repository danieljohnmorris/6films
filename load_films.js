var lastId;
var filmCount = 0;
var items = [];

function shuffle(array) {
  var counter = array.length, temp, index;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
  }

  return array;
}

function load() {
  $.ajaxSetup({
    async: false
  });

  var json_url = "http://www.reddit.com/r/FullMovieGifs/.json";
  if (lastId) {
      json_url = json_url + "?after=t3_" + lastId;
  }

  $.getJSON(json_url, function (data) {
      var children = data.data.children;
      $.each(children, function (i, item) {
        items.push(item);
      });
      if (children && children.length > 0) {
          lastId = children[children.length - 1].data.id;
      } else {
          lastId = undefined;
      }
  });

  $.ajaxSetup({
    async: true
  });
}

$(window).load(function(){
  for (var i=0;i<5;i++) {
      load();
  }

  items = shuffle(items);
  for (var i=0;i<maxFilmCount;i++) {
    if (items[i]) {
        $("<img/>").delay(100).attr("src", items[i].data.url).attr("alt", items[i].data.title).attr("title", items[i].data.title).appendTo("#images");
    }
  }

});//]]>  