class Product {
  constructor(id, title, price,  image, description ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;

  }
  Info(){
    return `#${this.id} ${this.title} ${this.price} ${this.description} $` ;
  }
}
