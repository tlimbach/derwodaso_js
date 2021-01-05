/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function LinkFinder(gui) {
    this.gui = gui;
    this.httpCon = new DuckDuckGoCon();
    thatLinkFinder = this;
}

LinkFinder.prototype.findLinksForMovie = function(movie) {
    console.log("find links for movie " + movie.getTitle());
    this.httpCon.searchMovieUrls(movie);
}

LinkFinder.prototype.findLinkForActor = function(actor) {
    var url = "https://api.duckduckgo.com/?q='" + actor.getQueryName() + "'&format=json";
    this.httpCon.searchActorUrl(url);
}