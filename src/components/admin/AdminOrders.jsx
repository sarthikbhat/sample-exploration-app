import React, { useEffect, useState, useMemo } from "react";

// Fixed: Efficient function
function fastFilter(orders, user) {
	return orders.filter(order => order.user === user);
}// Mocked orders data
const MOCK_ORDERS = [
	{ id: 1, user: "alice", total: 120, status: "Delivered" },
	{ id: 2, user: "bob", total: 80, status: "Pending" },
	{ id: 3, user: "alice", total: 200, status: "Shipped" },
	{ id: 4, user: "charlie", total: 50, status: "Delivered" },
];

export default function AdminOrders() {
	const [orders, setOrders] = useState([]);
	const [selectedUser, setSelectedUser] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setOrders(MOCK_ORDERS);
			setLoading(false);
		}, 1000);
	}, []);

	// Fixed: Memoized for performance
	const filteredOrders = useMemo(() => {
		return selectedUser ? fastFilter(orders, selectedUser) : orders;
	}, [orders, selectedUser]);

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Orders</h1>
			<div className="mb-6">
				<label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
					Filter by User:
				</label>
				<select
					id="user-select"
					value={selectedUser}
					onChange={(e) => setSelectedUser(e.target.value)}
					className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					aria-label="Select user to filter orders"
				>
					<option value="">All Users</option>
					<option value="alice">Alice</option>
					<option value="bob">Bob</option>
					<option value="charlie">Charlie</option>
				</select>
			</div>
			<div className="overflow-x-auto">
				<table 
					className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
					role="table"
					aria-label="Orders management table"
				>
					<caption className="sr-only">
						Table showing all orders with user details, totals, and status
					</caption>
					<thead className="bg-gray-100">
						<tr>
							<th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Order ID</th>
							<th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">User</th>
							<th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Total</th>
							<th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={4} className="px-4 py-8 text-center text-gray-600">
									<div role="status" aria-live="polite">
										Loading orders...
									</div>
								</td>
							</tr>
						) : filteredOrders.length === 0 ? (
							<tr>
								<td colSpan={4} className="px-4 py-8 text-center text-gray-600">
									No orders found
								</td>
							</tr>
						) : (
							filteredOrders.map((order) => (
								<tr
									key={order.id}
									className={`border-t hover:bg-gray-50 ${
										order.status === "Pending" ? "bg-red-50" : "bg-white"
									}`}
								>
									<td className="px-4 py-3 text-gray-900">{order.id}</td>
									<td className="px-4 py-3 text-gray-900 capitalize">{order.user}</td>
									<td className="px-4 py-3 text-gray-900 font-medium">${order.total}</td>
									<td className="px-4 py-3">
										<span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
											order.status === "Delivered" 
												? "bg-green-100 text-green-800" 
												: order.status === "Shipped"
												? "bg-blue-100 text-blue-800"
												: "bg-yellow-100 text-yellow-800"
										}`}>
											{order.status}
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<button 
				className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
				aria-label="Export orders data"
			>
				Export Orders
			</button>
		</div>
	);
}
