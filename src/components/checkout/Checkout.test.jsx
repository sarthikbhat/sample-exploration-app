import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import Checkout from "./Checkout";
import userEvent from "@testing-library/user-event";

const preloadedCartState = {
	cart: {
		items: [
			{
				productId: 1,
				quantity: 2,
				id: 1,
			},
		],
	},
};

describe("Checkout tests", () => {
	it("renders the products component", () => {
		renderWithProviders(<Checkout />, { preloadedState: preloadedCartState });
		const element = screen.getByText(/checkout/i);

		expect(element).toBeInTheDocument();
	});

	describe("Test checkout", () => {
		it("Cart items are being rendered", async () => {
			renderWithProviders(<Checkout />, {
				preloadedState: preloadedCartState,
			});
			const cartItems = await screen.findAllByTestId("cart-item");

			expect(cartItems).toHaveLength(1);
		});

		it("Test address fields and submit address", async () => {
			renderWithProviders(<Checkout />, {
				preloadedState: preloadedCartState,
			});
			const user = userEvent.setup();

			const firstName = await screen.findByPlaceholderText("First Name");
			const lastName = await screen.findByPlaceholderText("Last Name");
			const address = await screen.findByPlaceholderText("Address");
			const country = await screen.findByPlaceholderText("Country");
			const city = await screen.findByPlaceholderText("City");
			const zipcode = await screen.findByPlaceholderText("Zipcode");
			const contactNo = await screen.findByPlaceholderText("Contact Number");

			fireEvent.change(firstName, { target: { value: "Sarthik" } });
			fireEvent.change(lastName, { target: { value: "Bhat" } });
			fireEvent.change(address, { target: { value: "test" } });
			fireEvent.change(country, { target: { value: "test" } });
			fireEvent.change(city, { target: { value: "test" } });
			fireEvent.change(zipcode, { target: { value: "111111" } });
			fireEvent.change(contactNo, { target: { value: 1234567890 } });

			const addressSubmitButton = await screen.findByTestId("address-submit");

			await user.click(addressSubmitButton);

			expect(
				screen.getAllByRole("textbox").length +
					screen.getAllByRole("spinbutton").length
			).toBe(6);

			const cardholderName =
				await screen.findByPlaceholderText("Cardholder Name");
			const cardNumber = await screen.findByPlaceholderText("Card Number");
			const month = await screen.findByPlaceholderText("Month");
			const year = await screen.findByPlaceholderText("Year");
			const cvv = await screen.findByPlaceholderText("CVV");

			fireEvent.change(cardholderName, { target: { value: "Sarthik" } });
			fireEvent.change(cardNumber, { target: { value: 1111111111111111 } });
			fireEvent.change(month, { target: { value: "11" } });
			fireEvent.change(year, { target: { value: 1111 } });
			fireEvent.change(cvv, { target: { value: 111 } });

			const paymentSubmitButton = await screen.findByTestId("payment-submit");

			await user.click(paymentSubmitButton);
			screen.debug();
		});
	});
});
