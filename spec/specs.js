describe("Order", function() {
  it("should create a Order object with an empty array of pizzas, a price of 0 and a name", function() {
    var order = new Order("Bob Jones");
    expect(order.name).to.equal("Bob Jones");
    expect(order.pizzas).to.eql([]);
    expect(order.totalOrderPrice).to.equal(0)
  });

  it("lets pizzas be added to the order", function() {
    var order = new Order();
    var pizza = {};
    order.addPizza(pizza);
    expect(order.pizzas).to.eql([pizza]);
  });

  it("calculates the price for pizzas in the order", function() {
    var order = new Order();
    var cheese = new Pizza("cheese", "small", "extraCheese");
    var veggie = new Pizza("veggie", "personal");
    cheese.calculatePrice();
    veggie.calculatePrice();
    order.addPizza(cheese);
    order.addPizza(veggie);
    order.calculateOrderPrice();
    expect(order.totalOrderPrice).to.equal(8.00);
  });
});

describe("Pizza", function() {
  it("should create a Pizza object with attributes of type and toppings", function() {
    var pizza = new Pizza("mushroom", "large", "extraCheese");
    expect(pizza.type).to.equal("mushroom");
    expect(pizza.size).to.equal("large")
    expect(pizza.toppings).to.eql(["extraCheese"]);
  });

  it("should create create a method to calculatePrice", function() {
    var pizza = new Pizza("mushroom", "large", "extraCheese");
    pizza.calculatePrice();
    expect(pizza.totalPrice).to.equal(6.50);
  });
});