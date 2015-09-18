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

function Pizza (type, size) {
  this.size = size, 
  this.type = type,
  this.toppings = [],
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

  function emptyNewPizzaOption () {
    $(".form-inline").remove();
  }

  function renderNewPizzaBtn () {
    $("#user-interface").append("<button id='add-pizza' class='btn btn-primary'>Add a Pizza</button>");
    $("#add-pizza").on("click", function() {
      var exists = document.getElementById("adding-pizza-form");
      if (exists !== null) {
        $("#pizzaModal").modal("show");
      } else {
        renderNewPizzaOption();
      }
    });
  }

  function renderCheckoutModal() {
    var exists = document.getElementById("checkoutModal");
    if (exists) exists.remove();
    $("#content").append(
      "<div class='modal fade' id='checkoutModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>" +
        "<div class='modal-dialog' role='document'>" +
          "<div class='modal-content'>" +
            "<div class='modal-header'>" +
              "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
              "<h4 class='modal-title text-center' id='myModalLabel'>Checkout</h4>" +
            "</div>" +
            "<div class='modal-body'>" +
              "<h5>Total: $" + (orderTotal).toFixed(2) + "</h5>" + 
              "<p>Thanks for ordering at StumptownPies! Note that it will take probably 15 minutes to arrive.</p>" + 
            "</div>" +
            "<div class='modal-footer'>" +
              "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" 
    );
  }

  function renderCheckoutBtn () {
    $("#cart").append( "<button id='checkout' class='btn btn-primary btn-lg'>Checkout</button>");
    $("#checkout").on("click", function() {
      $("#checkoutModal").modal("show");
        renderCheckoutModal();
    });
  }

  function emptyCart() {
    orderTotal = 0;
    $("#cart").remove();
  }

  function renderCart() {
    $("#content").append(
      "<div id='cart' class='container well'>" +
        "<h4>Current Total: $<span id='total-price'></span></h4>" +
        "<ul id='pizzas-list'></ul>" +
      "</div>" 
    );
    $("#total-price").text(orderTotal);
    renderCheckoutBtn();
  }

  function updateCart(pizza) {
    orderTotal = order.totalOrderPrice;
    $("#total-price").text( orderTotal );
    pizzaSize = pizza.size;
    pizzaType = pizza.type.toLowerCase();
    pizzaCost = pizza.totalPrice;
    $("#pizzas-list").append(
        "<li>A <span id='pizza-size'>" + pizzaSize + "</span> <span id='pizza-type'>" + pizzaType + 
        "</span> <span id='pizza-cost'>$"+ pizzaCost +"</span></li>" 
     );
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
    ).insertBefore("#add-pizza");
    
    $("#add-order").on("click", function() {
      var selectedToppings = [];
      var type = $("#pizza-type").val();
      var size = $("#pizza-size").val().toLowerCase();
      
      if ( $("#extra-cheese:checked").val()  !== undefined ) { selectedToppings.push("extraCheese"); }
      if ( $("#pepperoni:checked").val()     !== undefined ) { selectedToppings.push("pepperoni");   }
      if ( $("#bacon:checked").val()         !== undefined ) { selectedToppings.push("bacon");       }
      if ( $("#pinapple:checked").val()      !== undefined ) { selectedToppings.push("pinapple");    }
      if ( $("#stuffed-crust:checked").val() !== undefined ) { selectedToppings.push("stuffedCrust");}

      var pizza = new Pizza(type, size);

      selectedToppings.forEach(function(selectedTopping) {
        pizza.toppings.push(selectedTopping);
      });

      pizza.calculatePrice();
      order.addPizza(pizza);
      order.calculateOrderPrice();
      renderSubTitle("A " + pizza.size + " " + pizza.type.toLowerCase() + " pizza was added!", "bg-success");
      updateCart(pizza);
      emptyNewPizzaOption();
    });
  }

  function renderClearOrderBtn () {
    $("#user-interface").append("<button id='clear-order' class='btn btn-danger'>Junk Order</button>");
    $("#clear-order").on("click", function() {
      order = new Order();
      emptyCart();
      renderCart();
      emptyUserInterface();
      renderOrderForm();
      renderSubTitle("Your cart has been cleared!", "bg-danger");
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
