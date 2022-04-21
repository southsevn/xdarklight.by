import { CartService } from "@/services";

export const cart = {
  data() {
    return {
      cartItems: CartService.getCart()
    }
  },
  methods: {
    addToCart(product) {
      this.clickEffect();
      CartService.addToCart(product);
      const cartCount = CartService.getCartCount();
      this.$store.commit("SET_CART_COUNT", cartCount);
    },
    changeCartItem(item, qnt) {
      if ((item.qnt + qnt) <= 1) {
        this.deniedEffect();
      }
      CartService.changeProductQnt(item.product, qnt);
      const updatedCart = CartService.getCart();
      this.cartItems = updatedCart;
    },
    deleteCartItem(product) {
      CartService.deleteProduct(product);
      const updatedCart = CartService.getCart();
      this.cartItems = updatedCart;
      const cartCount = CartService.getCartCount();
      this.$store.commit("SET_CART_COUNT", cartCount);
    },
    updateCartItem(product) {
      CartService.updateProduct(product);
      const updatedCart = CartService.getCart();
      this.cartItems = updatedCart;
    }
  }
}