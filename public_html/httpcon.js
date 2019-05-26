/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function HttpCon(apiKey) {
    this.init();
    this.baseUrl = "https://api.themoviedb.org/3/search/";
    this.apiKey = apiKey;
}

HttpCon.prototype.init = function () {
    console.log("init http con");
}

HttpCon.prototype.queryMovies = function (name, callback) {
    console.log("httpCon: query movies for name = " + name);
    var url = this.baseUrl + "movie?api_key=" + this.apiKey + "&query=" + name + "&language=de";
    $.getJSON(url, function (data) {
        console.log("yeah! " + data);
        var results = data.results;
        console.log("count = " + results.length);
        var movies = [];
        for (var t = 0; t < results.length; t++) {
            var res = results[t];
            movies.push(new Movie(res.id, res.title, res.poster_path));
        }
        callback(movies);
    }).fail(function (data, textstatus, xhr) {
        this.showServerError(data, textstatus, xhr);
    }.bind(this));
};

HttpCon.prototype.showServerError = function (data, textstatus, xhr) {
    console.log("error", data.status);
    console.log("STATUS: " + xhr);

    if (data.status === 401) {
        alert("Sie brauchen einen Key von TheMovieDatabase!");
    } else {
        alert("Diese Anfrage funktioniert leider nicht.\nFehlermeldung vom Server.");
    }
};


HttpCon.prototype.queryActors = function (name, callback) {
    console.log("httpCon: query actors for name = " + name);
    var url = this.baseUrl + "person?api_key=" + this.apiKey + "&query=" + name + "&language=de";
    $.getJSON(url, function (data) {
        console.log("yeah! actors" + data);
        var results = data.results;
        console.log("count = " + results.length);
        var actors = [];
        for (var t = 0; t < results.length; t++) {
            var res = results[t];
            actors.push(new Actor(res.name, res.id, res.profile_path));
        }
        callback(actors);
    }).fail(function (data, textstatus, xhr) {
        this.showServerError(data, textstatus, xhr);
    }.bind(this));
};

HttpCon.prototype.queryCharactersForMovie = function (movie, callback) {
    var url = "https://api.themoviedb.org/3/movie/" + movie.getId() + "?api_key=" + this.apiKey + "&append_to_response=credits,videos" + "&language=de";
    console.log("httpCon: query characters for  movie = " + movie.getTitle());
    $.getJSON(url, function (data) {
        console.log("received characters :  " + data);
        var cast = data.credits.cast;
        var characters = [];
        for (var t = 0; t < cast.length; t++) {
            var c = cast[t];
            var actor = new Actor(c.name, c.id, c.profile_path);
            characters.push(new Character(c.character, actor));
        }

        callback(characters);
    }).fail(function (data, textstatus, xhr) {
        this.showServerError(data, textstatus, xhr);
    }.bind(this));
};

HttpCon.prototype.queryMoviesForActor = function (actor, callback) {
    var url = "https://api.themoviedb.org/3/person/" + actor.getId() + "/movie_credits?api_key=" + this.apiKey + "&language=de";
    console.log("httpCon: query other movies for actor = " + actor.getName());
    $.getJSON(url, function (data) {
        console.log("received other movies :  " + data);
        var cast = data.cast;
        var movies = [];
        for (var t = 0; t < cast.length; t++) {
            var c = cast[t];
            var title = c.title;
            var posterPath = c.poster_path;
            var id = c.id;
            var character = c.character;

            movies.push(new Movie(id, title, posterPath, character));
        }

        callback(actor, movies);

    }).fail(function (data, textstatus, xhr) {
        this.showServerError(data, textstatus, xhr);
    }.bind(this));
};


