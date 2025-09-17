import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import Orders from "./Orders";
import userEvent from "@testing-library/user-event";

describe("Orders tests", () => {
	it("renders the products component", () => {
		renderWithProviders(<Orders />);
		const element = screen.getByText(/orders/i);

		expect(element).toBeInTheDocument();
	});

	describe("Test orders", () => {
		it("Test orders being rendered in table", async () => {
			renderWithProviders(<Orders />);
			const orderItems = await screen.findAllByTestId("order-row");

			expect(orderItems).toHaveLength(8);
		});

		it("Test pagination in orders [Next / Prev]", async () => {
			renderWithProviders(<Orders />);
			const user = userEvent.setup();


            // Next click
			const nextButton = await screen.findByTestId("next");

			await user.click(nextButton);

			const orderItemsNext = await screen.findAllByTestId("order-row");
			expect(orderItemsNext).toHaveLength(2);

            // Prev click
            const prevButton = await screen.findByTestId("prev");

			await user.click(prevButton);

			const orderItemsPrev = await screen.findAllByTestId("order-row");
            expect(orderItemsPrev).toHaveLength(8);

		});

        it("Test pagination in orders [First / Last]", async () => {
			renderWithProviders(<Orders />);
			const user = userEvent.setup();

            // Last click
            const lastButton = await screen.findByTestId("last");

			await user.click(lastButton);

			const orderItemsLast = await screen.findAllByTestId("order-row");
            expect(orderItemsLast).toHaveLength(2);

            // First click
			const firstButton = await screen.findByTestId("first");

			await user.click(firstButton);

			const orderItemsFirst = await screen.findAllByTestId("order-row");
			expect(orderItemsFirst).toHaveLength(8);

		});
	});
});
