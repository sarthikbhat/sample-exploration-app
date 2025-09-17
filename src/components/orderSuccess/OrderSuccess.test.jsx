import { screen } from "@testing-library/react";
import {  expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import OrderSuccess from "./OrderSuccess";

it("renders the order success component", () => {
	renderWithProviders(<OrderSuccess />);
	const element = screen.getByText(/Thank you for ordering/i);

	expect(element).toBeInTheDocument();
});
