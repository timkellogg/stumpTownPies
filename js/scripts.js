"use strict";

function Order () {
  this.pizzas = [];
}

Order.prototype.addPizza = function (pizza) {
  this.pizzas.push(pizza);
};

function Pizza (type, size, toppings) {
  this.size = size, 
  this.type = type,
  this.toppings = [toppings];
}

Pizza.prototype.calculatePrice = function () {
  var basePrice,
      toppingsPrice,
      totalPrice;
  if (this.size === "personal") {
    basePrice = 3.00;
  } else if (this.size === "small") {
    basePrice = 4.00;
  } else if (this.size === "medium") {
    basePrice = 5.00;
  } else if (this.size === "large") {
    basePrice = 6.00;
  } else if (this.size === "huge") {
    basePrice = 8.00;
  }
  toppingsPrice = this.toppings.length * 0.50;
  totalPrice = toppingsPrice + basePrice;
  return totalPrice;
};