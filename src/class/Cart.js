
class Cart {
  constructor (userId = null) {
    this.items = [];
    this.userId = userId;
    this.totalPrice = 0;
    this.creatCart = new Date();
   this.updateCart = new Date();
  }
  addToCart(product, quantity = 1) {
   this.items.push({product, quantity});
   this.updateCart = new Date();
   this.calculateTotal();
  }
  calculateTotal() {
   let total = 0;
   for (const item of this.items) {
     total += item.product.price * item.quantity;

   }
     this.totalPrice = total;
  }
  removeFromCart(index) {
    this.items.splice(index, 1);
    this.calculateTotal();
  }
}

class DiscountCard extends Cart {
  constructor(userId, discount = 0) {
    super(userId);
    this.discount = discount;
  }
  calculateTotal() {
    super.calculateTotal();
  }
}
export { Cart, DiscountCard };
