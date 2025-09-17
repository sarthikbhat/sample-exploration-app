import CustomAxios from "../utils/axiosInterceptor";

export function fetchCart() {
	return CustomAxios("/carts/user/128");
}

export function addToCart(product) {
	return CustomAxios.post("/carts", product);
}

export function deleteFromCartById(id) {
	return CustomAxios.delete(`/carts/${id}`);
}
