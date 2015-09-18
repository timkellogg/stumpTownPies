"use strict";

function Order () {
  this.pizzas = [];
}

Order.prototype.addPizza = function (pizza) {
  this.pizzas.push(pizza);
}