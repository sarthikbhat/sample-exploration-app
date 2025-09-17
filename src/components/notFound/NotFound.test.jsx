import { screen } from "@testing-library/react";
import {  expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import NotFound from "./NotFound";

it("renders the not found component", () => {
	renderWithProviders(<NotFound />);
	const element = screen.getByText(/Uh Oh!/i);

	expect(element).toBeInTheDocument();
});
