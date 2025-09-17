import CustomAxios from "../utils/axiosInterceptor";

export function fetchOrders() {
	return CustomAxios("/orders/user/128");
}

export function createOrder(payload) {
	return CustomAxios.post("/orders", payload);
}
