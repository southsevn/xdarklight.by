import Vue2Storage from "vue2-storage";

const storage = new Vue2Storage({
  prefix: "dl_",
});

export const CartService = {
  getCart() {
    return storage.get("cart") || [];
  },
  getCartCount() {
    const cart = this.getCart();

    return cart && cart.length ? cart.length : 0;
  },
  addToCart(addedProduct) {
    const cart = storage.get("cart");
    if (!cart) {
      storage.set("cart", [{ product: addedProduct, qnt: 1 }])
    } else {
      if (cart.find(item => item.product.id === addedProduct.id)) {
        const cartToUpdate = cart.map(item => {
          if (item.product.id === addedProduct.id) {
            return {
              product: item.product,
              qnt: item.qnt + 1
            }
          } else {
            return item;
          }
        })
        storage.set("cart", cartToUpdate);
      } else {
        storage.set("cart", [...cart, { product: addedProduct, qnt: 1 }]);
      }
    }
  },
  changeProductQnt(changedProduct, qnt) {
    const cart = this.getCart();

    if (cart.find(item => item.product.id === changedProduct.id)) {
      const cartToUpdate = cart.map(item => {
        if (item.product.id === changedProduct.id) {
          if ((item.qnt + qnt) >= 1) {
            return {
              product: item.product,
              qnt: item.qnt + qnt
            }
          } else {
            return item;
          }
        } else {
          return item;
        }
      })
      storage.set("cart", cartToUpdate);
    }
  },
  deleteProduct(deletedProduct) {
    const cart = this.getCart();

    if (cart.find(item => item.product.id === deletedProduct.id)) {
      const updatedCart = cart.filter(item => item.product.id !== deletedProduct.id);
      storage.set("cart", updatedCart);
    }
  },
  updateProduct(updatedProduct) {
    const cart = this.getCart();

    if (cart.find(item => item.product.id === updatedProduct.id)) {
      const cartToUpdate = cart.map(item => {
        if (item.product.id === updatedProduct.id) {
          return {
            product: updatedProduct,
            qnt: item.qnt
          };
        } else {
          return item;
        }
      })
      storage.set("cart", cartToUpdate);
    }
  }
}