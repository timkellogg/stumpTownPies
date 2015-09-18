"use strict";

function Order () {
  this.pizzas = [];
  this.totalOrderPrice = 0
}

Order.prototype.addPizza = function (pizza) {
  this.pizzas.push(pizza);
};

Order.prototype.calculateOrderPrice = function () {
  var orderCost = 0;
  this.pizzas.forEach(function(pizza) {
    orderCost += pizza.totalPrice;
  });
  this.totalOrderPrice = orderCost;
};

function Pizza (type, size, toppings) {
  this.size = size, 
  this.type = type,
  this.toppings = [toppings],
  this.totalPrice;
}

Pizza.prototype.calculatePrice = function () {
  var basePrice,
      toppingsPrice;
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
  this.totalPrice = toppingsPrice + basePrice;
};