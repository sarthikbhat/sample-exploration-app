import { createSlice } from "@reduxjs/toolkit";


export const loaderSlice = createSlice({
	initialState: false,
	name: "loader",
	reducers: {
		setLoading: (state, action) => {
			state = action.payload;            
            return state;
		},
	},
});

export const getLoadingState = (state) => state.loader

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
