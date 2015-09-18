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