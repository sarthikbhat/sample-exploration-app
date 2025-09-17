import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
	categories: [],
	minPrice: "",
	maxPrice: "",
	rating: [],
};


export const filterSlice = createSlice({
	initialState: initialFilterState,
	name: "filters",
	reducers: {
		addCategoryAction: (state, action) => {
			state.categories.push(action.payload);
			return state;
		},
		removeCategoryAction: (state, action) => {
			state.categories = state.categories.filter((e) => e !== action.payload);
			return state;
		},
		addRatingAction: (state, action) => {
			state.rating.push(action.payload);
			return state;
		},
		removeRatingAction: (state, action) => {
			state.rating = state.rating.filter((e) => e !== action.payload);
			return state;
		},
		updateMinPriceAction: (state, action) => {
			state.minPrice = action.payload;
			return state;
		},
		updateMaxPriceAction: (state, action) => {
			state.maxPrice = action.payload;
			return state;
		},
		clearFilterAction: () => {
			return initialFilterState;
		},
	},
});

export const getAllFilters = (state)=> state.filters;


export const {
	addCategoryAction,
	removeCategoryAction,
	addRatingAction,
	removeRatingAction,
	updateMinPriceAction,
	updateMaxPriceAction,
	clearFilterAction,
} = filterSlice.actions;
export default filterSlice.reducer;
