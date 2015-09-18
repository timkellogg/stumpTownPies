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
  var order = new Order("Customer"),
      orderTotal = 0,
      pizzaSize = "",
      pizzaType = "",
      pizzaCost = "";

  function renderSubTitle (message, styleClass) {
    if (styleClass) { $("#subtitle").addClass(styleClass).show().fadeOut(2000); }
    $("#subtitle").text(message);
  }

  function emptyUserInterface () {
    $("#user-interface").empty();
  }

  function renderNewPizzaBtn () {
    $("#user-interface").append("<button id='add-pizza' class='btn btn-primary'>Add a Pizza</button>");
    $("#add-pizza").on("click", function() {
      var exists = document.getElementById("adding-pizza-form");
      if (exists !== null) {
        $('#pizzaModal').modal('show');
      } else {
        renderNewPizzaOption();
      }
    });
  }

  function renderCart() {
    $("#content").append(
      "<div id='cart' class='container well'>" +
        "<h4>Current Total: $<span id='total-price'></span></h4>" +
        "<ul id='pizzas-list'></ul>" +
      "</div>" 
    )
    $("#total-price").text(orderTotal)
  }

  function updateCart(pizza) {
    orderTotal += pizza.totalPrice;
    $("#total-price").text( orderTotal );
    pizzaSize = pizza.size;
    pizzaType = pizza.type.toLowerCase();
    pizzaCost = pizza.totalPrice;
    $("#pizzas-list").append(
        "<li>A <span id='pizza-size'>" + pizzaSize + "</span> <span id='pizza-type'>" + pizzaType + 
        "</span> <span id='pizza-cost'>$"+ pizzaCost +"0</span></li>" 
     )
  }

  function renderNewPizzaOption () {
    $("<div id='adding-pizza-form' class='form-inline' role='form'>" +
      "<div class='form-group'>" +
        "<label for='pizza-type'>Type</label>" +
        "<select class='form-control' id='pizza-type'>" +
          "<option>Cheese</option>" +
          "<option>Veggie</option>" +
          "<option>Everything</option>" +
          "<option>Stumptown Surpise</option>" +
        "</select>" +
      "</div>" +
      "<div class='form-group'>" +
        "<label for='pizza-size'>Size</label>" +
        "<select class='form-control' id='pizza-size'>" +
          "<option>Personal</option>" +
          "<option>Small</option>" +
          "<option>Medium</option>" +
          "<option>Large</option>" +
          "<option>Huge</option>" +
        "</select>" +
      "</div>" +
      "<div class='form-group'>" +        
       "<label class='checkbox-inline'><input type='checkbox' id='extra-cheese' value='extra-cheese'> Extra Cheese</label>" +
       "<label class='checkbox-inline'><input type='checkbox' id='pepperoni' value='pepperoni'> Pepperoni</label>" +
       "<label class='checkbox-inline'><input type='checkbox' id='bacon' value='bacon'> Bacon</label>" +
       "<label class='checkbox-inline'><input type='checkbox' id='pinapple' value='pinapple'> Pinapple</label>" +
       "<label class='checkbox-inline'><input type='checkbox' id='stuffed-crust' value='stuffed-crust'> Stuffed Crust</label>" +
      "</div>" +
      "<button id='add-order' class='btn btn-success'>Add</button>" +
    "</div>"
    ).insertBefore('#add-pizza');
    
    $("#add-order").on("click", function() {
      var toppings = [];
      var type = $("#pizza-type").val();
      var size = $("#pizza-size").val().toLowerCase();
      
      if ( $("#extra-cheese:checked").val()  !== undefined ) { toppings.push("extraCheese"); }
      if ( $("#pepperoni:checked").val()     !== undefined ) { toppings.push("pepperoni");   }
      if ( $("#bacon:checked").val()         !== undefined ) { toppings.push("bacon");       }
      if ( $("#pinapple:checked").val()      !== undefined ) { toppings.push("pinapple");    }
      if ( $("#stuffed-crust:checked").val() !== undefined ) { toppings.push("stuffedCrust");}

      var pizza = new Pizza(type, size, "cheese");
      pizza.calculatePrice();
      renderSubTitle("A " + pizza.size + " " + pizza.type.toLowerCase() + " pizza was added!", "bg-success");
      $(".form-inline").remove();
      updateCart(pizza);
    });
  }


  function renderClearOrderBtn () {
    $("#user-interface").append("<button id='clear-order' class='btn btn-danger'>Junk Order</button>");
    $("#clear-order").on("click", function() {
      emptyUserInterface();
      renderOrderForm();
      renderSubTitle("Your cart has been cleared!", "bg-danger")
    });
  }

  function renderOrderForm () {
    emptyUserInterface();
    renderSubTitle("Select Pizza Options:");
    renderNewPizzaBtn();
    renderClearOrderBtn();
  }

  $("#start-order").on("click", function() {
    renderOrderForm();
    renderCart();
  });

});













