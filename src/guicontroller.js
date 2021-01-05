/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GuiController(apiKey) {
	this.finder = new Finder(this, apiKey);
	this.linkFinder = new LinkFinder(this);
	this.movies = [];
	this.actors = [];
	this.characters = [];
	this.oldMovies = [];
	thatGuiController = this;
	this.keepActor = false;
	this.keepActorName = "";
}


GuiController.prototype.init = function() {

	//  Film suchen
	$("#lstMovie").keydown(function(event) {
		if (event.keyCode === 13) {
			var name = $("#lstMovie").val();
			console.log("User entered movie for search " + name);
			this.finder.findMovies(name);
		}
	}.bind(this));

	$("#lstMovie").focus();

	//  Film auswählen
	$("#lstMovie").on("change", function() {
		var name = $("#lstMovie").val();
		console.log("User selected movie for loading " + name);

		$("#linkMovie").empty();
		$("#linkWikiMovie").empty();
		$("#linkWikiActor").empty();

		var movie = this.getMovieForName(name);
		this.loadMovieThings(movie);

	}.bind(this));

	//  Schauspieler suchen
	$("#lstActor").keydown(function(event) {
		if (event.keyCode === 13) {
			var name = $("#lstActor").val();
			console.log("User entered actorname for search " + name);
			this.finder.findActors(name);
		}
	}.bind(this));

	//  Schauspieler auswählen
	$("#lstActor").on("change", function() {
		var name = $("#lstActor").val();
		console.log("User selected actor for loading " + name);

		var actor = this.getActorForName(name);

		if (typeof (actor) !== "undefined") {
			// Actor ist vorhanden in aktuellem Movie
			this.updateGuiForSelectedActor(actor);
		} else {
			// Actor wurde frisch geladen

			$("#linkMovie").empty();
			$("#linkWikiMovie").empty();
			$("#linkActor").empty();
			
			$("#lgMoviePlakat").html("Filmplakat");

			for (var t = 0; t < this.actors.length; t++) {
				if (this.actors[t].getName() === name) {
					this.updateGuiForSelectedActor(this.actors[t]);
				}
			}

			$("#pictures").empty();
			$("#poster").empty();

			$("#movies").empty();
			$("#lstMovie").val(null);
			$("#characters").empty();
			$("#lstCharacter").val(null);


		}

	}.bind(this));

	$("#filter").keyup(function() {

		console.log("otherMOviesFilterfilter")

		var ft = $("#filter").val();
		console.log("change " + ft);
		this.populateOtherMoviesWithFilter(ft);

	}.bind(this));

	//  Rolle auswählen
	$("#lstCharacter").on("change", function() {
		var name = $("#lstCharacter").val();
		console.log("User selected character for loading " + name);

		var character = this.getCharacterForName(name);
		console.log("character choosen " + character.getName());
		var actor = character.getActor();
		this.updateGuiForSelectedActor(actor);
	}.bind(this));

	$("#lstMovie").click(function() {
		$("#lstMovie").val(null);
	});
	$("#lstActor").click(function() {
		$("#lstActor").val(null);
	});
	$("#lstCharacter").click(function() {
		$("#lstCharacter").val(null);
	});
};

GuiController.prototype.updateGuiForSelectedActor = function(actor) {
	$("#lstActor").val(actor.getName());
	this.finder.searchOtherMoviesForActor(actor);
	this.linkFinder.findLinkForActor(actor);

	this.setActorPoster(actor);
	var character = this.getCharacterForActor(actor);

	if (typeof (character) !== "undefined") {
		$("#lstCharacter").val(character.getName());
	}

};

GuiController.prototype.updateGuiForSelectedActorQueryName = function(actorQueryName) {
	var actor = this.getActorForQueryName(actorQueryName);
	this.updateGuiForSelectedActor(actor);
};

GuiController.prototype.setMovies = function(movies) {
	this.movies = movies;

	for (var t = 0; t < this.oldMovies.length; t++) {

		var oldMovie = this.oldMovies[t];

		if (typeof (oldMovie) !== "undefined") {
			console.log("pushing old movie " + oldMovie.getTitle());
			this.movies.push(this.oldMovies[t]);
		}
	}

	console.log("GuiController received movies " + this.movies.length);
	$("#movies").empty();
	for (var t = 0; t < this.movies.length; t++) {
		var movie = this.movies[t];
		$("<option/>").text(movie.getTitle())
			.appendTo("#movies");

	}

	if (this.movies.length > 0) {
		this.loadMovieThings(this.movies[0]);
	} else {
		alert("Es wurden keine Filme gefunden.");
	}
};

GuiController.prototype.setActors = function(actors) {
	this.actors = actors;
	console.log("GuiController received actors " + actors.length);
	$("#actors").empty();
	for (var t = 0; t < actors.length; t++) {
		var actor = actors[t];
		$("<option/>").text(actor.getName())
			.appendTo("#actors");

	}
	if (actors.length > 0) {
		this.updateGuiForSelectedActor(actors[0]);
	} else {
		alert("Es wurden keine Schauspieler gefunden.");
	}
};

GuiController.prototype.setCharacters = function(characters) {
	this.characters = characters;
	console.log("GuiController received characters " + characters.length);
	$("#characters").empty();
	$("#actors").empty();

	this.fillActorsImages(characters);

	if (characters.length > 0) {
		var firstCharacter = characters[0];

		$("#lstCharacter").val(firstCharacter.getName());
		$("#lstActor").val(firstCharacter.getActor().getName());

		if (this.keepActorName) {
			console.log("shoule keep actor name" + this.keepActorName);

			for (let i = 0; i < characters.length; i++) {
				const cr = characters[i];
				
			//	console.log("compating " + cr.getActor().getName() + " to " + this.keepActorName);
				
				if (cr.getActor().getName() == this.keepActorName) {
					$("#lstCharacter").val(cr.getName());
					$("#lstActor").val(cr.getActor().getName());
				}
			}
		}

		if (!this.keepActor) {


			this.setActorPoster(firstCharacter.getActor());
			this.linkFinder.findLinkForActor(firstCharacter.getActor());

			this.finder.searchOtherMoviesForActor(firstCharacter.getActor());
		}

		this.keepActor = false;
		this.keepActorName = "";
	}

};

GuiController.prototype.fillActorsImages = function(characters) {
	$("#pictures").empty();
	$("#lgAllRoles").html("Alle Darsteller (" + characters.length + ")");
	for (var t = 0; t < characters.length; t++) {
		var character = characters[t];
		$("<option/>").text(character.getName())
			.appendTo("#characters");

		$("<option/>").text(character.getActor().getName())
			.appendTo("#actors");

		var imgname = character.getActor().getProfilePath();

		if (imgname !== null) {
			var url = "http://image.tmdb.org/t/p/w500//" + imgname;

			var imgHtml = "<div class='pci'><img class='img_pci' src='" + url + "'></img></div>";

			var actorname = character.getActor().getName();
			var charactername = character.getName();

			var maxChars = 18;
			if (isIPhone) {
				maxChars = 34;
			}

			var actDisplayxName = actorname.substring(0, maxChars);

			console.log("isIphone?" + isIPhone);

			if (charactername.length === 0) {
				charactername = "???";
			}

			if (actorname.length === 0) {
				actorname = "???";
			}

			const actorQueryName = character.getActor().getName().replace(/\W/g, '');
			var html = "<div class='pcouter' onclick='updateGuiForSelectedActorQueryName(\"" + actorQueryName + "\"); '>";

			maxChars = 15;
			if (isIPhone) {
				maxChars = 34;
			}

			html += "<div class='pco'>" + charactername.substring(0, maxChars) + "</div>";
			html += imgHtml;
			html += "<div class='pcu'>" + actDisplayxName + "</div>";
			html += "</div>";

			$("#pictures").append(html);
		}
	}
};

function updateGuiForSelectedActorQueryName(queryName) {
	console.log("queryName is " + queryName);
	thatGuiController.updateGuiForSelectedActorQueryName(queryName);
}

GuiController.prototype.setActorPoster = function(actor) {
	$("#actorposter").empty();
	$("#lgActor").html(actor.getName());
	var imgname = actor.getProfilePath();
	if (imgname !== null) {
		var url = "http://image.tmdb.org/t/p/w500//" + imgname;
		var html = "<div><img src='" + url + "'></img></div>";

		$("#actorposter").append(html);
	}

};

GuiController.prototype.setOtherMoviesForActor = function(actor, movies) {
	console.log("setOtherMoviesForActor " + movies.length);
	console.log("actorname" + actor.getName());
	$("#lgOtherMovies").html("Filme mit " + actor.getName() + " (" + movies.length + ")");
	movies.sort(function(m1, m2) {

		var title1 = m1.getTitle();
		var title2 = m2.getTitle();

		if (title1 > title2) {
			return 1;
		}

		if (title1 < title2) {
			return -1;
		}

		return 0;
	});
	$("#otherMoviesList").empty();
	$("#filter").empty();
	this.otherMovies = movies;
	this.populateOtherMoviesWithFilter(null);
};

GuiController.prototype.populateOtherMoviesWithFilter = function(filter) {
	$("#otherMoviesList").empty();
	for (var t = 0; t < this.otherMovies.length; t++) {
		var movie = this.otherMovies[t];

		var text = movie.getTitle();

		var accept = filter == null;

		if (!accept) {
			accept = this.otherMovies[t].getTitle().toLowerCase().includes(filter.toLowerCase());
		}

		if (!accept) {

			var character = this.otherMovies[t].getCharacter();
			if (typeof (character) !== "undefined" && character.toLowerCase().includes(filter.toLowerCase())) {
				accept = true;
			}
		}

		if (accept) {

			var character = movie.getCharacter();
			if (typeof (character) !== "undefined" && character.length > 0) {
				text += " (" + character + ")";
			}

			var d = document.createElement('li');
			$(d).html(text)
				.appendTo($("#otherMoviesList")).click(function(e) {
					var movieName = e.target.innerHTML;

					var idxKlammerAuf = movieName.indexOf(" (");
					if (idxKlammerAuf > -1) {
						movieName = movieName.substring(0, idxKlammerAuf);
					}

					console.log("movie name >" + movieName + "<");
					this.keepActor = true;
					this.keepActorName = $("#lstActor").val();
					this.finder.findMovies(movieName);

				}.bind(this));
		}
	}

}

GuiController.prototype.loadMovieThings = function(movie) {
	if (typeof (movie) !== "undefined") {

		this.oldMovies.push(movie);

		this.finder.loadCharacters(movie);

		$('#poster').empty();
		var url = "http://image.tmdb.org/t/p/w500//" + movie.getPosterPath();

		var html = "<div><img src='" + url + "'></img></div>";
		$('#poster').html(html);
		$("#lstMovie").val(movie.getTitle());
		
		$("#lgMoviePlakat").html("Filmplakat - " + movie.getTitle());

		this.linkFinder.findLinksForMovie(movie);
	}
};

GuiController.prototype.getMovieForName = function(name) {
	for (var t = 0; t < this.movies.length; t++) {
		if (this.movies[t].getTitle() === name) {
			return this.movies[t];
		}
	}
};

GuiController.prototype.getCharacterForName = function(name) {
	for (var t = 0; t < this.characters.length; t++) {
		if (this.characters[t].getName() === name) {
			return this.characters[t];
		}
	}
};

GuiController.prototype.getActorForName = function(name) {
	for (var t = 0; t < this.characters.length; t++) {
		if (this.characters[t].getActor().getName() === name) {
			return this.characters[t].getActor();
		}
	}
};

GuiController.prototype.getActorForQueryName = function(queryName) {
	for (var t = 0; t < this.characters.length; t++) {
		if (this.characters[t].getActor().getQueryName() === queryName) {
			return this.characters[t].getActor();
		}
	}
};

GuiController.prototype.getCharacterForActor = function(actor) {
	for (var t = 0; t < this.characters.length; t++) {
		var c = this.characters[t];
		if (c.getActor() === actor) {
			return c;
		}
	}
};
