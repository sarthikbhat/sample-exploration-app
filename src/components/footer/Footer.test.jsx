import { screen } from "@testing-library/react";
import {  expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import Footer from "./Footer";

it("renders the footer component", () => {
	renderWithProviders(<Footer />);
	const list = screen.getAllByRole("list");
	const listItem = screen.getAllByRole("listitem");
    
	expect(list.length).toBe(4);
	expect(listItem.length).toBe(16);
});
