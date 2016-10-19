var page = 1;

var searchFlickr = function (query) {
  var flickrURL = 'https://api.flickr.com/services/rest/?jsoncallback=?';

  // $.post('someUrl') // automatically makes the type a post request
  $.getJSON(flickrURL, {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084',
    text: query,
    page: page,
    format: 'json'
  }).done(function (results) {
    _(results.photos.photo).each(function (p) {
      console.log(results);
      var x = results.photos.page;
      var url = generateURL(p);
      var $img = $('<img>', {src: url});
      $img.appendTo('#images');
    })
  }); page++;
};

  var generateURL = function (photo) {
    return [
      'http://farm',
      photo.farm,
      '.static.flickr.com/',
      photo.server,
      '/',
      photo.id,
      '_',
      photo.secret,
      '_q.jpg' // Change this for different sizes
    ].join('');
  };


$(document).ready(function () {
  $('#search').on('submit', function (e) {

    e.preventDefault(); // This form is going nowhere.
    var query = $('#query').val();
    searchFlickr(query);

  });
  
// use global variable to track what page you are up to (i)
  $(window).on('scroll', function () {
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    if (scrollBottom >= 800) {
      var query = $('#query').val();
      searchFlickr(query);
    }
    });
});

// _(results.photos.photo).each(function (p) {
// console.log(p);
// });
// VM317:2 Object {id: "30303310062", owner: "145185218@N02", secret: "092f96d563", server: "5709", farm: 6…}
