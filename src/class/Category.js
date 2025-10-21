class Category{
  constructor(id, name ){
    this.id = id;
    this.name = name;
  }
 getInfo(){
    return `#${this.id}${this.name}$`;
 }
}

