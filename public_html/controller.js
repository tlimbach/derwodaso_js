/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(
        function () {
//            $("#filter").keyup(function (event) {
//                console.log("filter keydown");
//                FilterSelectList("otherMoviesList", "filter");
//            });
            console.log(window.location.href);
            var apiKey = window.location.href.substring(window.location.href.length-32,window.location.href.length);
            console.log("api Key=" + apiKey);
            new GuiController(apiKey).init();
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
