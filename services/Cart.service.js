import Vue2Storage from "vue2-storage";

const storage = new Vue2Storage({
  prefix: 'dl_',
});

export const CartService = {
  getCart() {
    return storage.get('cart') || [];
  },
  getCartCount() {
    const cart = this.getCart();

    return cart && cart.length ? cart.length : 0;
  },
  addToCart(productId) {
    const cart = storage.get('cart');
    if (!cart) {
      storage.set('cart', [{ id: productId, qnt: 1 }])
    } else {
      if (cart.find(product => product.id === productId)) {
        const cartToUpdate = cart.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              qnt: product.qnt + 1
            }
          } else {
            return product;
          }
        })
        storage.set('cart', cartToUpdate)
      } else {
        storage.set('cart', [...cart, { id: productId, qnt: 1 }])
      }
    }
  }
}