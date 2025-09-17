import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addToCart, deleteFromCartById, fetchCart } from "../../../api/cart";

let STATE_POPULATED = false;

export const fetchCartThunk = createAsyncThunk("cart/fetchCart", async () => {
	if (!STATE_POPULATED) {
		STATE_POPULATED = true;
		return await fetchCart();
	}
	return [];
});

const _addToCartThunk = createAsyncThunk(
	/**  @param arg {any} */
	"cart/addToCart",
	async (product) => {
		return await addToCart(product);
	}
);

// Workaround for error in  tests -> Expected 0 arguments, but got 1
export const addToCartThunk = (product) => _addToCartThunk(product);

export const clearCartThunk = createAsyncThunk(
	"cart/clearCart",
	async (cart) => {
		const cartIds = cart.map((e) => e.id);
		await Promise.all(
			cartIds.map((id) => {
				return deleteFromCartById(id);
			})
		);

		return true;
	}
);

export const deleteFromCartThunk = createAsyncThunk(
	"cart/deleteFromCart",
	async (id) => {
		return await deleteFromCartById(id);
	}
);

export const cartSlice = createSlice({
	initialState: { items: [], isLoading: false, error: null },
	name: "cart",
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(_addToCartThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(_addToCartThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			const index = state.items.findIndex((e) => e.id === action.payload.id);
			if (index !== -1) state.items[index].quantity = action.payload.quantity;
			else state.items.push(action.payload);

			toast("Sucessfully added to cart !!");
		});
		builder.addCase(_addToCartThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
			toast.error("Error in adding to cart !!");
		});
		builder.addCase(deleteFromCartThunk.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteFromCartThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.items = state.items.filter((e) => e.id !== action.payload.id);
			// return state;
		});
		builder.addCase(deleteFromCartThunk.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		});
		builder.addCase(clearCartThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.items = [];
				state.isLoading = false;
				state.error = null;
			}
		});
		builder.addCase(fetchCartThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.error = null;
			state.items = action.payload;
		});
	},
});

export const getCartItems = (state) => state.cart.items;

export const { addToCartAction } = cartSlice.actions;
export default cartSlice.reducer;
