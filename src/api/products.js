import CustomAxios from "../utils/axiosInterceptor";

export function fetchProducts({ controller, filters, page, sort, limit }) {
	const { categories, rating, minPrice, maxPrice } = filters;
	return CustomAxios("products", {
		signal: controller?.signal,
		params: {
			page,
			sort,
			limit,
			category: categories.toString(),
			minPrice,
			maxPrice,
			rating: Math.max(...rating),
		},
	});
}

export function fetchProductById(id, controller) {
	return CustomAxios(`/products/${id}`, { signal: controller?.signal });
}

export function fetchProductCategories() {
	return CustomAxios("/products/categories");
}
