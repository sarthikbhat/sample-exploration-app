import { http, HttpResponse } from "msw";

const Mock_Orders = [...Array(10).keys()].map((e) => {
	return {
		shippingAddress: {
			firstName: "John",
			lastName: "Doe",
			addressLine1: "11, Somebuilding",
			addressLine2: "Landmark",
			city: "Mumbai",
			zipcode: "123123",
			contactNo: "123123123123",
		},
		id: e + 1,
		userId: 1,
		date: "2023-05-06T14:24:34.122Z",
		paymentStatus: "PAID",
		orderStatus: "CONFIRMED",
		__v: 0,
	};
});

export const handlers = [
	http.get(
		"https://fake-ecommerce-app-api.onrender.com/products/categories",
		() => {
			return HttpResponse.json(["smartphones", "laptop"]);
		}
	),

	http.get(
		"https://fake-ecommerce-app-api.onrender.com/products?limit=6&page=1&category=&minPrice=0&maxPrice=5000",
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
					{
						id: 3,
						title: "iPhone X",
						description:
							"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
						price: 899,
						rating: 4.44,
						category: "smartphones",
						image: "https://i.dummyjson.com/data/products/2/1.jpg",
						__v: 0,
					},
				],
			});
		}
	),

	http.get(
		"https://fake-ecommerce-app-api.onrender.com/products?limit=6&page=1&category=smartphones,laptops&minPrice=0&maxPrice=5000",
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
	),

	http.get(
		"https://fake-ecommerce-app-api.onrender.com/products?limit=2&page=1&category=&minPrice=0&maxPrice=5000",
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
	),

	http.get("https://fake-ecommerce-app-api.onrender.com/products/1", () => {
		return HttpResponse.json({
			id: 1,
			title: "iPhone 9",
			description: "An apple mobile which is nothing like apple",
			price: 549,
			rating: 4.69,
			category: "smartphones",
			image: "https://i.dummyjson.com/data/products/1/1.jpg",
			__v: 0,
		});
	}),
	http.get("https://fake-ecommerce-app-api.onrender.com/products/2", () => {
		return HttpResponse.json({
			id: 2,
			title: "iPhone X",
			description: "An apple mobile which is nothing like apple",
			price: 549,
			rating: 4.69,
			category: "smartphones",
			image: "https://i.dummyjson.com/data/products/1/1.jpg",
			__v: 0,
		});
	}),
	http.delete("https://fake-ecommerce-app-api.onrender.com/carts/1", () => {
		return HttpResponse.json({
			id: 1,
			userId: 128,
			date: "2023-05-06T14:13:39.976Z",
			productId: 1,
			quantity: 15,
			__v: 0,
		});
	}),

	http.get("https://fake-ecommerce-app-api.onrender.com/carts", () => {
		return HttpResponse.json({
			productId: 1,
			userId: 128,
			quantity: 2,
		});
	}),

	http.get("https://fake-ecommerce-app-api.onrender.com/carts/user/128", () => {
		return HttpResponse.json([
			{
				productId: 1,
				userId: 128,
				quantity: 2,
			},
		]);
	}),

	http.post("https://fake-ecommerce-app-api.onrender.com/orders", () => {
		return HttpResponse.json({});
	}),

	http.get(
		"https://fake-ecommerce-app-api.onrender.com/orders/user/128",
		() => {
			return HttpResponse.json(Mock_Orders);
		}
	),

	http.post("https://fake-ecommerce-app-api.onrender.com/carts", () => {
		return HttpResponse.json({
			_id: "6456609752a0ac64c3ec613d",
			id: 5,
			userId: 1,
			date: "2023-05-07T06:09:19.902Z",
			productId: 6,
			quantity: 10,
			isActive: true,
			__v: 0,
		});
	}),
];
