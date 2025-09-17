import { Link } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function OrderSuccess() {
	return (
		<section className="flex flex-col gap-4 items-center m-17">
			<IoCheckmarkCircle className="text-6xl" />
			<p className="font-normal text-gray-700">Thank you for ordering</p>
			<p className="font-normal text-gray-700 text-sm text-center md:text-md">
				Your order has been placed successfully and is under processing.
			</p>
			<div className="flex gap-4 flex-wrap">
				<Link  to="/orders" className="border-1 p-2 text-center px-10 mt-2 flex-1 font-medium cursor-pointer">
					View Orders
				</Link>
				<Link to="/" className="border-1 p-2 text-center px-10 mt-2 flex-1 min-w-max bg-black w-full text-white font-medium cursor-pointer">
					Continue Shopping
				</Link>
			</div>
		</section>
	);
}
