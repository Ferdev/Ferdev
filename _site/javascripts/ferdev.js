Modernizr.load([
  {
    load: '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.js',
    complete: function () {
      if (!window.jQuery) {
        Modernizr.load('javascripts/jquery-1.9.0.js');
      }

      detectWindowScroll();
      bounceFerdev();
      $('header hgroup img').hover(startTalking, stopTalking);
      $('#menu .top').click(goToTop);
      $('.portfolio .summary a').click(showPortfolioDetail);
      $('.portfolio .detail a.hide').click(hidePortfolioDetail);
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

var bounceFerdev = function() {
  if ($('body').hasClass('start-talking') || $('body').hasClass('stop-talking')) {
    return;
  }
  var photo = $('header hgroup .photo')
  photo.addClass('bounce');
  setTimeout(function(){
    photo.removeClass('bounce');
    setTimeout(bounceFerdev, 3000);
  }, 1000);
}

var startTalking = function() {
  $('body').addClass('start-talking');
  $('body').removeClass('stop-talking');
};

var stopTalking = function() {
  $('body').removeClass('start-talking');
  $('body').addClass('stop-talking');
  setTimeout(function(){
    $('body').removeClass('stop-talking');
  }, 900);
};

var goToTop = function(evt) {
  evt.preventDefault();

  $('html,body').animate({scrollTop: 0}, 500);
};

var showPortfolioDetail = function(evt) {
  evt.preventDefault();
  $('.portfolio').children('li').removeClass('inactive');
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
  $(this).addClass('sending');
}
