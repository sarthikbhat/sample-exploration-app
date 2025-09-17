import { render, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import appStore from "../store/store";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(
	ui,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = Object.keys(preloadedState).length > 0
			? appStore(preloadedState)
			: appStore(),
		...renderOptions
	} = {}
) {

	Wrapper.propTypes = {
		children: PropTypes.any,
	};
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders(
	ui,
	{
		// preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = appStore(),
		...renderOptions
	} = {}
) {
	Wrapper.propTypes = {
		children: PropTypes.any,
	};
	function Wrapper({ children }) {
		return (
			<Provider store={store}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...renderHook(ui, { wrapper: Wrapper, ...renderOptions }) };
}
