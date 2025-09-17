import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoader } from "../../hooks/useLoader";
import Accordion from "../../shared/accordion/Accordion";
import CartInfo from "../../shared/cartInfo/CartInfo";
import OrderSummary from "../../shared/orderSummary/OrderSummary";
import { deleteFromCartThunk, getCartItems } from "../../store/slices/cart";
import { DUMMY_TEXT } from "../../utils/stringUtils";
import { fetchCartDataUtil } from "../../utils/componentUtils";

export default function Cart() {
	const [cartItems, setCartItems] = useState([]);
	const cartStore = useSelector(getCartItems);
	const dispatch = useDispatch();
	const { setIsLoading } = useLoader();

	async function fetchData(controller = null) {
		setIsLoading(true);
		const tempCart = await fetchCartDataUtil(controller,cartStore)
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

	async function deleteFromCart(id) {
		setIsLoading(true);
		await dispatch(deleteFromCartThunk(id));
		setIsLoading(false);
	}

	return (
		<section className="app-cart p-2 px-2 md:px-14 lg:px-28 mt-4 flex flex-col gap-2">
			<h2 className="text-2xl">Your cart</h2>
			<section className="main-cart flex gap-10 flex-wrap">
				<section className="cart-details w-full md:flex-[0.6] flex flex-col gap-2">
					<p className="text-sm">
						Not ready to checkout?{" "}
						<Link to={"/"} className="underline">
							Continue Shopping
						</Link>
					</p>
					<div className="flex flex-col gap-4 mt-3">
						{cartItems.length ? (
							cartItems.map((item) => {
								return (
									<CartInfo
										key={item?.id}
										item={item}
										type="md"
										deleteFromCart={deleteFromCart}
									/>
								);
							})
						) : (
							<div className="mt-10 text-center text-black/75">
								{" "}
								Uh Oh!! Please add some items to cart
							</div>
						)}
					</div>
				</section>
				<section className="coupon-and-checkout flex w-full md:flex-[0.5] flex-col gap-4">
					<p className="text-lg">Order Summary</p>
					<OrderSummary totalPrice={calculateTotalPrice()} />
					{cartItems.length ? (
						<Link
							to={"/checkout"}
							type="button"
							aria-disabled={!cartItems.length}
							className="border-1 p-2 bg-black text-white font-medium text-center cursor-pointer"
						>
							Continue to checkout
						</Link>
					) : (
						<div
							type="button"
							aria-disabled={!cartItems.length}
							className="border-1 p-2 bg-black/25 cursor-not-allowed text-white font-medium text-center"
						>
							Continue to checkout
						</div>
					)}
				</section>
			</section>
			<section className="order-info-extra w-full md:w-[50%] mt-10">
				<p className="text-md">Order Information</p>
				<hr className="border-gray-500 mt-2" />
				<Accordion label="Return Policy">
					<p className="mt-2 text-left">{DUMMY_TEXT}</p>
				</Accordion>
				<Accordion label="Shipping Policy">
					<p className="mt-2 text-left">{DUMMY_TEXT}</p>
				</Accordion>
			</section>
		</section>
	);
}
