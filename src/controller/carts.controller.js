import CartsManagerMongo from "../dao/cartsManagerMongo.js";

export default class CartController {
  async get(req, res) {
   
    return await CartsManagerMongo.get();
  }

  async create(req, res, body) {
    

    return await CartsManagerMongo.create(body);
  }

  async getById(cid) {
  
    const cart = await CartsManagerMongo.getById(cid);
    const a = cart.products.map((product) => product.toJSON());
    const b = cart._id;
    return { products: a, cartId: b };
  }

  async updateById(req, res, cid, body) {
 

    return await CartsManagerMongo.updateById(cid, body);
  }

  async deleteById(req, res, cid) {
   

    return await CartsManagerMongo.deleteProductsInCart(cid);
  }

  async deleteProduct(cid, pid, quantity) {
    const cart = await CartsManagerMongo.getById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    return await CartsManagerMongo.deleteProduct(cid, pid, quantity);
  }

  async deleteProduct(cid, pid, quantity) {
    const cart = await CartsManagerMongo.getById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    await CartsManagerMongo.deleteProduct(cid, pid, quantity);
    return cart;
  }

  async updateProduct(cid, pid, quantity) {
    const cart = await CartsManagerMongo.getById(cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    await CartsManagerMongo.updateById(cid, pid, quantity);

    return cart;
  }
}
