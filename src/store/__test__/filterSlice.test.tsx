import { describe, expect, it } from "vitest";
import {
	addCategoryAction,
	addRatingAction,
	clearFilterAction,
	removeCategoryAction,
	removeRatingAction,
	updateMaxPriceAction,
	updateMinPriceAction,
} from "../slices/filter";
import reducer from "../slices/filter";

const testInitialState = {
	categories: [],
	rating: [],
	minPrice: "",
	maxPrice: "",
};

describe("Test Filter slice", () => {
	describe("[Categories] :: test filter slice", () => {
		it("add category", async () => {
			const reducerTest = reducer(
				testInitialState,
				addCategoryAction("smartphones")
			);
			expect(reducerTest.categories.length).toBe(1);
		});
		it("remove category", async () => {
			const newState = reducer(
				testInitialState,
				addCategoryAction("smartphones")
			);
			const reducerTest = reducer(
				newState,
				removeCategoryAction("smartphones")
			);
			expect(reducerTest.categories.length).toBe(0);
		});
	});
	describe("[Rating] :: test filter slice", () => {
		it("add rating", async () => {
			const reducerTest_1 = reducer(testInitialState, addRatingAction("4"));
			const reducerTest_2 = reducer(reducerTest_1, addRatingAction("3"));
			expect(reducerTest_2.rating.length).toBe(2);
		});
		it("remove rating", async () => {
			const newState = reducer(testInitialState, addRatingAction("4"));
			const reducerTest = reducer(newState, removeRatingAction("4"));
			expect(reducerTest.rating.length).toBe(0);
		});
	});

	describe("[MinMaxPrice] :: test filter slice", () => {
		it("update minPrice", async () => {
			const minPriceReducer = reducer(
				testInitialState,
				updateMinPriceAction("100")
			);
			expect(minPriceReducer.minPrice).toEqual("100");
		});
		it("update maxPrice", async () => {
			const maxPriceReducer = reducer(
				testInitialState,
				updateMaxPriceAction("200")
			);
			expect(maxPriceReducer.maxPrice).toBe("200");
		});
	});

	describe("[Clear Filter] :: test filter slice", () => {
		it("clear filter", async () => {
			const reducerTest_1 = reducer(testInitialState, addRatingAction("4"));
			const clearFilterReducer = reducer(reducerTest_1, clearFilterAction());
			expect(clearFilterReducer).toEqual(testInitialState);
		});
	});
});
