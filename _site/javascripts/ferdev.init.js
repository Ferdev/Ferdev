$(document).ready(function() {
  ferdev().init();
});
var ferdev = function(){

  var links = function(){
    $('a.external').live('click', function(evt){
      evt.preventDefault();
      window.open($(this).attr('href'));
    });
  };
  
  var navigation = function(){
    $('#menu li a').live('click', function(evt){
      evt.preventDefault();
      var 
        destination_id = $(this).attr('href'),
        scrollTo       = $(destination_id).offset().top;
      $('html,body').animate({scrollTop: scrollTo}, 2000, 'easeInOutExpo');
    });
  };  
  
  var pagination = function(){
    $('section.articles div.more_posts a').live('click', function(evt){
      evt.preventDefault();
      var 
        container = $(this).parent(),
        page      = $(this).attr('rel');
      $(this).before($('<span/>').addClass('loading'));
      $.get('/'+page+'/index.html', function(objHTML){
        container.replaceWith($(objHTML).closest('section.articles').children());
      });
    });
  };
  
  return {
    init: function(){
        preloadImages();
        links();
        navigation();
        pagination();
    }    
  };    
};