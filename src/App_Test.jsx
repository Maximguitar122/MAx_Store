import {getCategories, getProducts} from "./api/api.js";
import Cart from "./class/Cart.js";
import {jest} from '@jest/globals';
jest.mock('./api/api.js', () => ({
  getCategories: jest.fn(),
  getProducts: jest.fn(),
}));

describe('App logic (unit tests only)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getCategories повертає список категорій', async () => {
    const mockCategories = [
      { id: 1, name: 'electronics' },
      { id: 2, name: 'jewelery' },
    ];
    getCategories.mockResolvedValue(mockCategories);

    const result = await getCategories();
    expect(result).toEqual(mockCategories);
    expect(getCategories).toHaveBeenCalledTimes(1);
  });

  test('getProducts повертає список продуктів', async () => {
    const mockProducts = [
      { id: 1, title: 'Phone', price: 100 },
      { id: 2, title: 'Laptop', price: 200 },
    ];
    getProducts.mockResolvedValue(mockProducts);

    const result = await getProducts();
    expect(result).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  test('Cart додає і видаляє товари', () => {
    const cart = new Cart('test-user');

    cart.addItem({ id: 1, title: 'Test Product', price: 100 });
    expect(cart.items.length).toBe(1);

    cart.removeItem(1);
    expect(cart.items.length).toBe(0);
  });

  test('Cart обчислює загальну суму', () => {
    const cart = new Cart('test-user');

    cart.addItem({ id: 1, price: 100 });
    cart.addItem({ id: 2, price: 200 });

    expect(cart.getTotal()).toBe(300);
  });
});


