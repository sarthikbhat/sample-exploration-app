import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart";
import filterSlice from "./slices/filter";
import loaderSlice from "./slices/loading";

const appStore = (preloadedState) => configureStore({
	reducer: {
		cart: cartSlice,
		filters: filterSlice,
		loader: loaderSlice,
	},
	preloadedState
});

export default appStore;
