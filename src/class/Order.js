class Order{
  constructor(cart){
    this.id = Math.floor(Math.random()*1000);
    this.items = cart.items;
    this.total = cart.totalPrice;
    this.status = "pending";
    this.createCart = new Date();
  }
  getSummary(){
    return{
      id: this.id,
      total: this.total,
      items: this.items.map(i => ({
        name: i.product.name,
        price: i.product.price,
        quantity: i.product.quantity,

      })),

      status: this.status,
      createCart: this.createCart,
    }
  }

  completeOrder(){
    this.status = "completed";
  }
  canceledOrder(){
    this.status = "canceled";
  }
}
export {Order};
