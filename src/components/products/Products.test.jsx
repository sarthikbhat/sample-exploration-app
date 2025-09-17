import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Products from "./Products";
import { renderWithProviders } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";
import { server } from "../../utils/server";
import { http, HttpResponse } from "msw";
import { STRING_UTILS } from "../../utils/stringUtils";

describe("Products tests", () => {
	it("renders the products component", () => {
		renderWithProviders(<Products />);
		const element = screen.getByText(/e-Commerce shop app/i);

		expect(element).toBeInTheDocument();
	});

	describe("Test Filters", () => {
		it("categories are being rendered", async () => {
			renderWithProviders(<Products />);
			const categories = await screen.findAllByTestId(STRING_UTILS.CATEGORY);

			expect(categories).toHaveLength(2);
		});

		it("products are being displayed", async () => {
			renderWithProviders(<Products />);

			const products = await screen.findAllByTestId("products-image");

			expect(products).toHaveLength(2);
		});

		it("products are being displayed on filtering", async () => {
			server.use(
				http.get(
					"https://fake-ecommerce-app-api.onrender.com/products?limit=5&page=1&category=smartphones,laptops&minPrice=0&maxPrice=5000",
					() => {
						return HttpResponse.json({
							products: [
								{
									id: 2,
									title: "iPhone 9",
									description: "An apple mobile which is nothing like apple",
									price: 549,
									rating: 4.69,
									category: "smartphones",
									image: "https://i.dummyjson.com/data/products/1/1.jpg",
									__v: 0,
								},
							],
						});
					}
				)
			);
			renderWithProviders(<Products />);
			const user = userEvent.setup();
			const categories = await screen.findAllByTestId(STRING_UTILS.CATEGORY);

			await user.click(categories[0]);
			const products = await screen.findAllByTestId("products-image");
			expect(products).toHaveLength(1);
		});
	});
});
