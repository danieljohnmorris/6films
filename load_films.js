var lastId;
var filmCount = 0;

function load() {
    var json_url = "http://www.reddit.com/r/FullMovieGifs/.json";
    if (lastId) {
        json_url = json_url + "?after=t3_" + lastId;
    }
    $.getJSON(json_url, function (data) {
        var children = data.data.children;
        $.each(children, function (i, item) {
            if (filmCount < maxFilmCount) {
                filmCount = filmCount + 1;
                $("<img/>").attr("src", item.data.url).appendTo("#images");
            }
        });
        if (children && children.length > 0) {
            lastId = children[children.length - 1].data.id;
        } else {
            lastId = undefined;
        }
    });
}

$.ajaxSetup({
    async: false
});

for (var i=0;i<5;i++) {
    load();
}

$.ajaxSetup({
    async: true
});

