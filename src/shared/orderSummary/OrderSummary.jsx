import PropTypes from "prop-types";

export default function OrderSummary({ totalPrice }) {
	return (
		<>
			<input
				type="text"
				name="coupon"
				placeholder="Enter coupon code here"
				className="border-1 border-[#4e4f50] max-w-full outline-0 text-sm text-black p-2 pl-4 w-full"
			/>
			<div className="flex justify-between text-sm font-light">
				<p>Subtotal</p>
				<p>${totalPrice}</p>
			</div>
			<div className="flex justify-between text-sm text-right font-light border-b-1 border-black pb-5">
				<p>Shipping</p>
				<p>Calculated at the next step</p>
			</div>
			<div className="flex justify-between text-sm font-light">
				<p>Total</p>
				<p>${totalPrice}</p>
			</div>
		</>
	);
}

OrderSummary.propTypes = {
	totalPrice: PropTypes.number.isRequired,
};
