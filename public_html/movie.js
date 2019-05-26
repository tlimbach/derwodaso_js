/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Movie(id, title,  posterPath, character) {
    this.id = id;
    this.title = title;
    this.posterPath = posterPath;
    this.character = character;
}

Movie.prototype.getTitle = function () {
    return this.title;
}

Movie.prototype.getId = function () {
    return this.id;
}

Movie.prototype.getPosterPath = function () {
    return this.posterPath;
}

Movie.prototype.getCharacter = function() {
    return this.character;
}