import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from "react-router-dom";
import Products from "./components/products/Products";
import Product from "./components/product/Product";
import Orders from "./components/orders/Orders";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import OrderSuccess from "./components/orderSuccess/OrderSuccess";
import Header from "./components/header/Header";
import NotFound from "./components/notFound/NotFound";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Header />}>
			<Route path="/" element={<Navigate to="/products" replace={true} />} />
			<Route index path="/products" element={<Products />} />
			<Route path="/product/:id" element={<Product />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/orders" element={<Orders />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="/order-success" element={<OrderSuccess />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

export default router;
