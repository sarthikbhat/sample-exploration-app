import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import Product from "./Product";
import Header from "../header/header";

describe("Test product", () => {
	it("Test product being rendered in table", async () => {
		renderWithProviders(
			<>
				<Header />
				<Product />
			</>
		);
		vi.mock("react-router-dom", async(importOriginal) => {
            const actual = await importOriginal()
            return {
                ...actual,
                useParams: () => ({ id: 1 }),
            }
		});
		const user = userEvent.setup();
		const orderItems = await screen.findByTestId("add-to-cart");

		await user.click(orderItems);

		const cartSize = await screen.findByTestId("cart-size");
		expect(cartSize.textContent.trim()).toBe("2");
	});
});
