"use strict";

function Order (name) {
  this.pizzas = [];
  this.name = name;
  this.totalOrderPrice = 0;
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
  this.totalPrice = 0;
}

Pizza.prototype.calculatePrice = function () {
  var basePrice,
      toppingsPrice;
  switch(this.size) {
    case "personal":
      basePrice = 3;
      break;
    case "small":
      basePrice = 4;
      break; 
    case "medium":
      basePrice = 5;
      break;
    case "large":
      basePrice = 6;
      break;
    case "huge":
      basePrice = 8;
      break;
  }
  toppingsPrice = this.toppings.length * 0.50;
  this.totalPrice = toppingsPrice + basePrice;
};

$(document).ready(function() {

  function renderSubTitle (message) {
    $("#subtitle").text(message);
  }

  function emptyUserInterface () {
    $("#user-interface").empty();
  }

  function renderNewPizzaBtn () {
    $("#user-interface").append("<button id='add-pizza' class='btn btn-primary'>Add a Pizza</button>");
    $("#add-pizza").on("click", function() {
      renderNewPizzaOption();
    });
  }

  function renderNewPizzaOption () {
    $("<div class='row'>Pizza</div>").insertBefore('#add-pizza');
  }

  function renderOrderForm () {
    emptyUserInterface();
    renderSubTitle("Select Pizza Options:");
    renderNewPizzaBtn();
  }

  $("#start-order").on("click", function() {
    renderOrderForm();
  });

});













