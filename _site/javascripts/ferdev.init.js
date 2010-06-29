$(document).ready(function() {
	ferdev.init();
});
var ferdev = {

    init: function(){
        ferdev.portfolio.init();
    },
    
    portfolio: {
        init: function(){
            $('ul#portfolio_projects li.project').hover(function() {
                $(this)
                .fadeTo('normal', 1)
                .find('ul.project_data').fadeIn();
            }, function() {
                $(this)
                .fadeTo('normal', 0.3)
                .find('ul.project_data').fadeOut();
            });
        }
    }
};