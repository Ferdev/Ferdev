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
      $('html,body').animate({scrollTop: scrollTo}, 2000, 'easeInOutExpo');
    });
    var 
      navigation = $('nav'),
      navigation_top = parseInt(navigation.css('top'));
    $(document).scroll(function(evt){
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function(){
        navigation.animate({'top': $(this).scrollTop() + navigation_top}, 1000, 'easeInOutExpo');
      }, 100);      
    });
  };  
  
  return {
    init: function(){
        portfolio();
        navigation();
    }    
  };    
};