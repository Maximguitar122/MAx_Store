export async function getCategories() {
  const url = `https://fakestoreapi.com/products/categories`;
try{
  const res = await fetch(url);
  if (!res.ok) throw new Error("Помилка завантаження категорій");

  const data = await res.json();
  const categoryImages = {
    electronics: "https://placehold.co/600x400?text=Electronics",
    jewelery: "https://placehold.co/600x400?text=Jewelery",
    "men's clothing": "https://placehold.co/600x400?text=Men's+Clothing",
    "women's clothing": "https://placehold.co/600x400?text=Women's+Clothing",
  };
  return data.map((name, index) => ({
    id: index + 1,
    name,
    image: categoryImages[name] || "https://placehold.co/600x400?text=Category",
  }));

} catch(error) {
  console.error("Помилка при завантаженні категорій ");


}finally {
  console.log(" Запит getCategories() завершено");
}

}







export async function getProducts(categoryName) {
  const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Помилка завантаження товарів");
  return res.json();
}
