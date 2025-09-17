import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../../hooks/useLoader";
import { fetchCartDataUtil } from "../../utils/componentUtils";
import {
	clearCartThunk,
	deleteFromCartThunk,
	getCartItems,
} from "../../store/slices/cart";
import CartInfo from "../../shared/cartInfo/CartInfo";
import OrderSummary from "../../shared/orderSummary/OrderSummary";
import Address from "./Address";
import Payment from "./Payment";
import { createOrder } from "../../api/orders";

export default function Checkout() {
	const [cartItems, setCartItems] = useState([]);
	const [currentStep, setCurrentStep] = useState(0);
	const [checkoutDetails, setCheckoutDetails] = useState({
		address: {},
		payment: {},
	});
	const cartStore = useSelector(getCartItems);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { setIsLoading } = useLoader();

	async function fetchData(controller = null) {
		setIsLoading(true);
		const tempCart = await fetchCartDataUtil(controller, cartStore);
		setCartItems(tempCart);
		setIsLoading(false);
	}

	useEffect(() => {
		const abortController = new AbortController();
		if (cartStore.length) {
			fetchData(abortController);
		} else {
			setCartItems([]);
		}
		return () => {
			abortController.abort();
		};
	}, [cartStore]);

	function calculateTotalPrice() {
		return cartItems.reduce((acc, curr) => {
			acc += curr.price * curr.quantity;
			return acc;
		}, 0);
	}

	function handleAddressSubmit(data) {
		setCheckoutDetails({ ...checkoutDetails, address: data });
		setCurrentStep(1);
	}

	async function handlePaymentSubmit(data) {
		setCheckoutDetails({ ...checkoutDetails, payment: data });
		const payload = {
			userId: 128,
			products: cartStore,
			paymentStatus: "PAID",
			orderStatus: "CONFIRMED",
			shippingAddress: checkoutDetails.address,
		};

		await createOrder(payload);
		dispatch(clearCartThunk(cartStore));
		navigate("/order-success");
	}

	async function deleteFromCart(id) {
		setIsLoading(true);
		await dispatch(deleteFromCartThunk(id));
		setIsLoading(false);
	}

	return (
		<section className="app-checkout p-2 px-2 md:px-14 lg:px-28 flex flex-col gap-10 mt-4">
			<h2 className="text-2xl">Checkout</h2>
			<section className="app-checkout-main flex gap-4 md:gap-10 justify-between flex-wrap-reverse md:flex-nowrap">
				<section className="checkout-details w-full md:flex-[0.6] lg:flex-[0.4] flex flex-col gap-2">
					<div className="flex gap-2 items-center justify-center">
						<p className={currentStep == 0 ? "font-medium" : null}>Address</p>
						<div className="w-[7%] h-[1.5px] bg-gray-500"></div>
						<p className={currentStep == 1 ? "font-medium" : null}>Payment</p>
					</div>
					<h2 className="text-lg mt-4">
						{currentStep === 0 ? "Shipping Information " : "Paymnent Details"}
					</h2>
					{currentStep === 0 ? (
						<Address handleAddressSubmit={handleAddressSubmit} />
					) : (
						<Payment handlePaymentSubmit={handlePaymentSubmit} />
					)}
				</section>
				<hr className="md:hidden border-black mt-5 h-1 w-full" />
				<section className="cart-details flex w-full md:flex-[0.6] lg:flex-[0.4] flex-col gap-4">
					<p className="text-lg md:text-md">Your cart</p>
					<div className="flex flex-col gap-4 mt-3">
						{!!cartItems.length &&
							cartItems.map((item) => {
								return (
									<CartInfo
										key={item.id}
										item={item}
										type="sm"
										deleteFromCart={deleteFromCart}
									/>
								);
							})}
						<OrderSummary totalPrice={calculateTotalPrice()} />
					</div>
				</section>
			</section>
		</section>
	);
}
