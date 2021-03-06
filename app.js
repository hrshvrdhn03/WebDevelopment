var allFeeds = [{
  name: 'CSS Tricks',
  url: 'http://feeds.feedburner.com/CssTricks'
}, {
  name: 'HTML5 Rocks',
  url: 'http://feeds.feedburner.com/html5rocks'
}, {
  name: 'Linear Digressions',
  url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

function init() {
  loadFeed(0);
  $('body').removeClass('menu-hidden');
}

/* This function performs everything necessary to load a
 * feed using the rss2json API.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
function loadFeed(id, cb) {

  $.ajax({
    type: "GET",
    url: 'https://api.rss2json.com/v1/api.json',
    data: {
      rss_url: 'http://feeds.feedburner.com/CssTricks'
    },
    success: function (result, status) {
      if (cb) {
        cb( /*something*/ );
      }
    },
    error: function (result, status, err) {
      //run only the callback without attempting to parse result due to error
      if (cb) {
        cb();
      }
    },
    dataType: "json"
  });
}
window.onload = init;

$(function () {
  var feedList = $('.feed-list'),
    feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
    menuIcon = $('.menu-icon-link');


  allFeeds.forEach(function (feed) {
    feedList.append(feedItemTemplate(feed));
  });

  feedList.on('click', function () {
    var item = $(this);
    $('body').addClass( /*A class here*/ );
    loadFeed(item.data('id'));
    return false;
  });

  /* When the menu icon is clicked on, we need to toggle a class
   * on the body to perform the hiding/showing of our menu.
   */

   $(document).ready(function(){
     $("a.menu-icon-link").click(function(){
       $(".slide-menu").toggleClass('menu-hidden');
     });
     /*on scroll slide menu back in*/
     $(".feed").scroll(function(){
         $(".slide-menu").addClass("menu-hidden");
    });
   });



}());
