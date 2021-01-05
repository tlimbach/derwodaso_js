/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DuckDuckGoCon() {
    console.log("hi from dukduckgo con");
    thatDuckDuckGoCon = this;
}

DuckDuckGoCon.prototype.searchMovieUrls = function (movie) {

    $("#linkWikiMovie").empty();
    $("#linkMovie").empty();
    $("#linkWikiActor").empty();

    console.log("DuckDuckGoCon: query searchMovieUrl for name = " + url);

    var url = "https://api.duckduckgo.com/?q='" + movie.getTitle().replace(/\W/g, '') + "' film&format=json";

    var hasWikiUrl = false;
    var hasMovieUrl = false;
    $.ajaxSetup({
        headers: {
            'Accept-Language': 'de-DE'
        }
    });
    $.getJSON(url, function (data) {
        if (typeof (data.AbstractURL) !== "undefined" && data.AbstractURL.length > 0) {
            thatDuckDuckGoCon.handleMovieWikiUrlResult(data);
            hasWikiUrl = true;
        }

        if (data.Results.length > 0) {
            thatDuckDuckGoCon.handleMovieUrlResult(data);
            hasMovieUrl = true;
        }

        if (hasMovieUrl === false || hasWikiUrl === false) {
            url = "https://api.duckduckgo.com/?q='" + movie.getTitle() + "'&format=json";
            $.ajaxSetup({
                headers: {
                    'Accept-Language': 'de-DE'
                }
            });
            $.getJSON(url, function (data) {
                if (hasWikiUrl === false && typeof (data.AbstractURL) !== "undefined") {
                    thatDuckDuckGoCon.handleMovieWikiUrlResult(data);
                }
                if (hasMovieUrl === false && data.Results.length > 0) {
                    thatDuckDuckGoCon.handleMovieUrlResult(data);
                }
            });
        }
    }
    );
};

DuckDuckGoCon.prototype.handleMovieWikiUrlResult = function (data) {
    console.log("search movie urls! " + data);
    var wikiMovieUrl = data.AbstractURL;

    $("#linkWikiMovie").html("<a href='" + wikiMovieUrl + "' title='" + wikiMovieUrl + "' target='_blank'>" + "Film bei Wikipedia" + "</a>");
}

DuckDuckGoCon.prototype.handleMovieUrlResult = function (data) {
    console.log("hmur");
    var movieUrl = data.Results[0].FirstURL;
    $("#linkMovie").html("<a href='" + movieUrl + "' title='" + movieUrl + "' target='_blank'>" + "URL zu Film" + "</a>");
}

DuckDuckGoCon.prototype.searchActorUrl = function (url) {
    console.log("DuckDuckGoCon: query searchActorUrl for name = " + url);

   $("#linkWikiActor").empty();
    $.ajaxSetup({
        headers: {
            'Accept-Language': 'de-DE'
        }
    });
    $.getJSON(url, function (data) {
        console.log("yeahduckduckg22o! " + data);
        var wikiActorUrl = data.AbstractURL;
        $("#linkWikiActor").html("<a href='" + wikiActorUrl + "' title='" + wikiActorUrl + "' target='_blank'>" + "URL Schauspieler" + "</a>");
    });
};
