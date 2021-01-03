/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Finder(gui, apiKey) {
	that = this;
	this.httpCon = new HttpCon(apiKey);
	this.gui = gui;
	this.init();
}

Finder.prototype.init = function() {
	console.log("init finder!");
};

Finder.prototype.findMovies = function(name) {
	console.log("find movies with name " + name);
	this.httpCon.queryMovies(encodeURI(name), this.receivedMovieResults);
};

Finder.prototype.receivedMovieResults = function(movies) {
	console.log("Finder received movies: " + movies.length);
	that.gui.setMovies(movies);
};

Finder.prototype.findActors = function(name) {
	console.log("find actors with name " + name);
	this.httpCon.queryActors(encodeURI(name), this.receivedActorResults);
};


Finder.prototype.receivedActorResults = function(actors) {
	console.log("Finder received actors: " + actors.length);
	that.gui.setActors(actors);
};


Finder.prototype.loadCharacters = function(movie) {
	console.log("loading characters for movie " + movie.getTitle());
	this.httpCon.queryCharactersForMovie(movie, this.receivedCharacterResults);
};

Finder.prototype.receivedCharacterResults = function(characters) {
	console.log("Finder received characters: " + characters.length);
	that.gui.setCharacters(characters);
}

Finder.prototype.searchOtherMoviesForActor = function(actor) {
	console.log("searching other movies for actor " + actor.getName());
	this.httpCon.queryMoviesForActor(actor, this.receivedOtherMoviesForActor);
}

Finder.prototype.receivedOtherMoviesForActor = function(actor, movies) {
	console.log("received other movies for actor " + movies.length);
	that.gui.setOtherMoviesForActor(actor, movies);
}


