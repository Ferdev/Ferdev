Modernizr.load([
  {
    load: '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js',
    complete: function () {
      if (!window.jQuery) {
        Modernizr.load('javascripts/jquery-1.9.0.js');
      }

      detectWindowScroll();
      $('#menu .top').click(goToTop);
      $('#menu li:not(.top) a').click(goToSection);
      $('.portfolio .summary a').click(showPortfolioDetail);
      $('.portfolio .detail a').click(hidePortfolioDetail);
      $('form').submit(sendHireMeForm);
    }
  },
  {
    test : Modernizr.touch,
    load: '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js',
    complete : function () {
      if (!window.jQuery) {
        Modernizr.load('javascripts/jquery-1.9.0.js');
      }

      $('.portfolio .summary img').each(function() {
        this.ontouchend = showPortfolioHover;
      });
    }
  }
]);

var detectWindowScroll = function() {
  var goToTopLink = $('nav li.top'),
      didScroll = true;

  $(window).scroll(function() {
      didScroll = true;
  });

  var checkIfScrolled = function() {
    if ( didScroll ) {
      didScroll = false;

      if ($(window).scrollTop() > 0) {
        goToTopLink.removeClass('inactive');
        goToTopLink.addClass('active');
      } else {
        if (goToTopLink.hasClass('active')) {
          goToTopLink.addClass('inactive');
        }
        goToTopLink.removeClass('active');
      }
    }
  };

  setInterval(checkIfScrolled, 250);
  checkIfScrolled();
};

var goToTop = function(evt) {
  evt.preventDefault();

  $('html,body').animate({scrollTop: 0}, 500);
};

var goToSection = function(evt) {
  evt.preventDefault();
  var destination_id = $(this).attr('href'),
      scrollTo       = $(destination_id).offset().top;
  $('html,body').animate({scrollTop: scrollTo}, 1000);
};

var showPortfolioDetail = function(evt) {
  evt.preventDefault();
  $('.portfolio').children('li').removeClass('active');
  $(this).closest('li').addClass('active');
};

var hidePortfolioDetail = function(evt) {
  evt.preventDefault();
  $('.portfolio').children('li').removeClass('active');
  $(this).closest('li').addClass('inactive');
};

var showPortfolioHover = function(evt) {
  evt.preventDefault();
  $(this).parent().addClass(':hover');
};

var sendHireMeForm = function(evt) {
  var form = $(this);

  form.addClass('sending');

  //$.get(form.attr('action'), form.serialize(), function(res) {
    //form.addClass('sent');
    //form.append(res);
  //});

  return false;
}
