import { describe, expect, it, vi } from "vitest";

import { configureStore } from "@reduxjs/toolkit";
import { addToCartThunk, fetchCartThunk } from "../slices/cart";
import CustomAxios from "../../utils/axiosInterceptor";

const testInitialState = { items: [], isLoading: false, error: null }

describe("Test Cart slice", () => {
	const mockStore = configureStore({
		reducer: function (state = {}, action) {
			switch (action.type) {
				case "cart/addToCart/fulfilled":
					return action.payload;
				case "cart/fetchCart/fulfilled":
					return action.payload;
				default:
					return state;
			}
		},
	});
	it("add to cart", async () => {
		const cartItem = {
			productId: 1,
			userId: 128,
			quantity: 2,
		};
		const addToCartSpy = vi
			.spyOn(CustomAxios, "post")
			.mockResolvedValue({ ...cartItem, id: 1 });

		await mockStore.dispatch(addToCartThunk(cartItem));
		expect(addToCartSpy).toBeCalledWith(
			"/carts",
			cartItem
		);
		const state = mockStore.getState();

		expect(state).toStrictEqual({ ...cartItem, id: 1 });
	});

	it("fetch cart", async () => {
		const cartItem = {
			productId: 1,
			userId: 128,
			quantity: 2,
		};
		const fetchCartSpy = vi
			.spyOn(CustomAxios, "get")
			.mockResolvedValue([{ ...cartItem, id: 1 }]);

		await mockStore.dispatch(fetchCartThunk());
		const state = mockStore.getState();

		expect(state.length).toBe(1);
	});
});
