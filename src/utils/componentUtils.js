import { fetchProductById } from "../api/products";

export async function fetchCartDataUtil(controller = null, cartStore = []) {
	const productIds = cartStore.map((e) 	=> e.productId);
	const res = await Promise.all(
		productIds.map((id) => {
			return fetchProductById(id, controller);
		})
	);
	const tempCart = [];
	res.forEach((data) => {
		const index = cartStore.findIndex((e) => e.productId === data?.id);
		if (index !== -1) {
			const item = {
				...cartStore[index],
				title: data.title,
				price: data.price,
				image: data.image,
			};
			tempCart.push(item);
		}
	});
	return tempCart;
}
