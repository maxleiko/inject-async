// Created by leiko on 13/08/14 15:40
function Class() {
    this.started = false;
}

Class.prototype.syncStart = function () {
    this.started = true;
};

Class.prototype.asyncStart = function () {
    var done = this.async();

    setTimeout(function () {
        this.started = true;
        done();
    }.bind(this), 3000);
};

module.exports = Class;