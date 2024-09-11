import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : { products: [], totalSum: 0, vat: 0, totalWithVAT: 0 };
};

const saveCartToLocalStorage = (state) => {
    localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = getCartFromLocalStorage();

const calculateTotals = (state) => {
    const totalSum = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
    const vat = totalSum * 0.12;
    state.totalSum = totalSum;
    state.vat = vat;
    state.totalWithVAT = totalSum + vat;
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index === -1) {
                state.products.push(action.payload);
            } else {
                state.products[index].quantity += 1;
            }
            calculateTotals(state);
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                if (state.products[index].quantity > 1) {
                    state.products[index].quantity -= 1;
                } else {
                    state.products = state.products.filter(product => product.id !== action.payload.id);
                }
                calculateTotals(state);
                saveCartToLocalStorage(state);
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.totalSum = 0;
            state.vat = 0;
            state.totalWithVAT = 0;
            saveCartToLocalStorage(state);
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;