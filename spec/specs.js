describe("Order", function() {
  it("should create a Order object with an empty array of pizzas", function() {
    var order = new Order();
    expect(order.pizzas).to.eql([]);
  });

  it("lets pizzas be added to the order", function() {
    var order = new Order();
    var pizza = {};
    order.addPizza(pizza);
    expect(order.pizzas).to.eql([pizza]);
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
    expect(pizza.calculatePrice()).to.equal(6.50);
  });
});