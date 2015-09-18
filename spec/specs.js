describe("Order", function() {

  it("should create a Order object with an empty array of pizzas", function() {
    var order = new Order();
    expect(order.pizzas).to.eql([]);
  });
});