import { screen } from "@testing-library/react";
import {  expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import Header from "./Header";

it("renders the header component", () => {
	renderWithProviders(<Header />);
	const element = screen.getAllByRole("link");
    
	expect(element.length).toBe(4);
});
