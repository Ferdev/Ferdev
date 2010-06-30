$(document).ready(function() {
	ferdev().init();
});
var ferdev = function(){
  
  var portfolio = function(){
    $('ul#portfolio_projects li.project').hover(function() {
        $(this)
        .fadeTo('normal', 1)
        .find('ul.project_data').fadeIn();
    }, function() {
        $(this)
        .fadeTo('normal', 0.3)
        .find('ul.project_data').fadeOut();
    });
  };
  
  var navigation = function(){
    $('#menu li a').live('click', function(evt){
      evt.preventDefault();
      var 
        destination_id = $(this).attr('href'),
        scrollTo       = $(destination_id).offset().top;
      $('html, body').animate({scrollTop: scrollTo}, 2000, 'easeInOutExpo');
    });
  };  
  
  return {
    init: function(){
        portfolio();
        navigation();
    }    
  };    
};