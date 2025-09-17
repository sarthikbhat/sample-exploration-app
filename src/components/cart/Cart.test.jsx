import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import Cart from "./Cart";

const preloadedCartState = {
    cart: {
        items: [
            {
                productId: 1,
                quantity: 2,
                id: 1,
            },
            {
                productId: 2,
                quantity: 2,
                id: 2,
            },
        ],
    },
}

describe("cart tests", () => {
	it("renders the cart component", () => {
		renderWithProviders(<Cart />);
		const element = screen.getByText(/Your Cart/i);

		expect(element).toBeInTheDocument();
	});

	describe("Test cart", () => {
		it("Cart items are being rendered", async () => {
			renderWithProviders(<Cart />, {
				preloadedState: preloadedCartState
			});
			const cartItems = await screen.findAllByTestId("cart-item");

			expect(cartItems).toHaveLength(2);
		});

        it("Test remove from cart", async ()=>{
            renderWithProviders(<Cart />, {
				preloadedState: preloadedCartState
			});
            const user = userEvent.setup()

            const cartRemoveButton = await screen.findAllByTestId("remove-cart");

            await user.click(cartRemoveButton[0])

            const cartItems = await screen.findAllByTestId("cart-item");

			expect(cartItems).toHaveLength(1);
        })
	});
});
