/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Actor(name, id, profilePath) {
    this.id = id;
    this.name = name;
    this.profilePath = profilePath;
}

Actor.prototype.getName = function () {
    return this.name;
}

Actor.prototype.getId = function () {
    return this.id;
}

Actor.prototype.getProfilePath = function () {
    return this.profilePath;
}

