var Dude = (function () {
    function Dude() {
        this.drink = "White Russian with Milk";
    }
    Dude.prototype.drinks = function () {
        return this.drink;
    };
    return Dude;
}());
var dude = new Dude();
console.log(dude.drinks());
