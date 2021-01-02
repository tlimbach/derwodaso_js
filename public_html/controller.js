/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var isIPhone = false;
$(document).ready(
        function () {
//            $("#filter").keyup(function (event) {
//                console.log("filter keydown");
//                FilterSelectList("otherMoviesList", "filter");
//            });
            console.log(window.location.href);
            var apiKey = window.location.href.substring(window.location.href.length - 32, window.location.href.length);
            console.log("api Key=" + apiKey);

// vertikal Zentrieren

            (function () {

                var $container = $('html'),
                        height = $container.outerHeight();
                var wHeight = window.innerHeight;

                var yPos = wHeight / 2 - height / 2;

				console.log("width " + $container.innerWidth());
				
				if ($container.innerWidth()<800) {
					isIPhone = true;
				} 
			

                console.log("doHeight ?=" + wHeight);

                $container.css({
                    'marginTop': yPos
                });


            })();

            new GuiController(apiKey).init();
          //  $('#pc').css('height', '400px');

            // $('#mp').css('background-color', 'yellow');
            // $('#sp').css('background-color', 'orange');
            // $('#ap').css('background-color', 'cyan');
            // $('#ml').css('background-color', 'green');
            // $('#pc').css('background-color', 'purple');



        });

function FilterSelectList(selectListId, filterId) {
    var filter = $("#" + filterId).val();
    filter = filter.toUpperCase();

    var options = $("#" + selectListId + " li");
    for (var i = 0; i < options.length; i++) {
        if (options[i].text.toUpperCase().indexOf(filter) < 0)
            $(options[i]).css("display", "none");
        else
            $(options[i]).css("display", "block");
    }
}
;
