import { useEffect, useRef, useState } from "react";
import { useLoader } from "../../hooks/useLoader";
import Paginate from "./Pagination";
import { fetchOrders } from "../../api/orders";

export default function Orders() {
	const PER_PAGE = 8;
	const [allOrders, setAllOrders] = useState([]);
	const [offsets, setOffsets] = useState({ start: 0, end: PER_PAGE });
	const [paginateOrders, setPaginateOrders] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const apiCalled = useRef(false);
	const { setIsLoading } = useLoader();

	async function fetchData() {
		setIsLoading(true);
		const data = await fetchOrders();
		setIsLoading(false);
		setAllOrders(data);
		setTotalItems(data.length);
		const paginatedData = data.slice(0, PER_PAGE);
		setPaginateOrders(paginatedData);
	}

	useEffect(() => {
		if (!apiCalled.current) {
			fetchData();
			apiCalled.current = true;
		}
	}, []);

	useEffect(() => {
		const tempOrders = allOrders.slice(offsets.start, offsets.end);
		setPaginateOrders(tempOrders);
	}, [offsets]);

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString().replaceAll("/", "-");
	}

	function handlePagination(start, end) {
		setOffsets({ start, end });
	}

	return (
		<section className="app-orders p-2 px-28 flex flex-col gap-6 mt-4">
			<div className="flex justify-between w-[100% ̰]">
				<h1 className="text-3xl">My Orders</h1>
				<section className="order-sort-outer flex justify-end">
					<div className="flex flex-col">
						<div className="flex gap-2 border-1 border-black/75 p-2 justify-center w-fit">
							<select className="outline-0 font-medium" name="sortby">
								<option value="all">All</option>
								<option value="7">Last 7 days</option>
								<option value="30">Last 30 days</option>
								<option value="60">Last 60 days</option>
							</select>
						</div>
					</div>
				</section>
			</div>
			<div className="shadow-md border-1 border-black/35 rounded-md mt-2">
				<table className="w-full">
					<thead className="border-b-1 border-black">
						<tr>
							<th className="p-2">Order No.</th>
							<th className="p-2">Customer Name</th>
							<th className="p-2">Payment Status</th>
							<th className="p-2">Amount</th>
							<th className="p-2">Address</th>
							<th className="p-2">Order Date</th>
							<th className="p-2">Status</th>
						</tr>
					</thead>
					<tbody>
						{paginateOrders.map((order) => {
							return (
								<tr
									className="border-b-1 border-black text-center w-full last:border-0"
									key={order.id + order.date}
									data-testid="order-row"
								>
									<td className="p-2">{order.id}</td>
									<td>{`${order?.shippingAddress?.firstName} ${order?.shippingAddress?.lastName}`}</td>
									<td>{order?.paymentStatus}</td>
									<td>$ 999</td>
									<td>{`${order?.shippingAddress?.addressLine1}, ${order?.shippingAddress?.addressLine2}, ${order?.shippingAddress?.city}`}</td>
									<td>{formatDate(order?.date)}</td>
									<td>{order?.orderStatus}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{totalItems > PER_PAGE && (
				<Paginate
					perPage={PER_PAGE}
					handlePagination={handlePagination}
					totalItems={totalItems}
				/>
			)}
		</section>
	);
}
