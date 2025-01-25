import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  // Guarda el carrito en localStorage cada vez que se actualiza
  updateLocalStorage: () => {
    localStorage.setItem("cart", JSON.stringify(get().cart));
  },

  // Agregar un producto al carrito
  addCart: (product) =>
    set((state) => {
      const productIndex = state.cart.findIndex((item) => item.id === product.id);
      let updatedCart;

      if (productIndex !== -1) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, cantidad: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Remover una unidad de un producto
  removeCart: (product) =>
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0); // Elimina productos con cantidad 0

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Eliminar completamente un producto del carrito
  deleteProduct: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  // Vaciar todo el carrito
  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart");
      return { cart: [] };
    }),

  // Obtener el total de productos únicos
  getTotalProducts: () => get().cart.length,

  // Obtener la cantidad total de unidades en el carrito
  getTotalUnits: () => get().cart.reduce((acc, item) => acc + item.cantidad, 0),

  // Obtener el precio total del carrito
  getTotalPrice: () =>
    get()
      .cart.reduce((acc, item) => acc + item.cantidad * item.precio, 0)
      .toFixed(2),
}));
