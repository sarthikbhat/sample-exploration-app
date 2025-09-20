import React, { useEffect, useState, useMemo } from "react";

// Fixed: Efficient function
function fastFilter(orders, user) {
	return orders.filter((order) => order.user === user);
} // Mocked orders data
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
	const [announceText, setAnnounceText] = useState("");

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setOrders(MOCK_ORDERS);
			setLoading(false);
		}, 1000);
	}, []);

	// Fixed: Memoized for performance
	const filteredOrders = useMemo(() => {
		const filtered = selectedUser ? fastFilter(orders, selectedUser) : orders;
		// Announce filter results to screen readers
		if (orders.length > 0) {
			const message = selectedUser
				? `Showing ${filtered.length} orders for ${selectedUser}`
				: `Showing all ${filtered.length} orders`;
			setAnnounceText(message);
		}
		return filtered;
	}, [orders, selectedUser]);

	return (
		<main className="min-h-screen bg-gray-50 p-4">
			<a
				href="#admin-orders-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded focus:z-50"
			>
				Skip to main content
			</a>
			<header>
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Orders</h1>
			</header>
			<section id="admin-orders-content" aria-labelledby="admin-orders-heading">
				<h2 id="admin-orders-heading" className="sr-only">
					Orders Management
				</h2>
				{/* Live region for screen reader announcements */}
				<div aria-live="polite" aria-atomic="true" className="sr-only">
					{announceText}
				</div>
				<div className="mb-6">
					<form aria-label="Filter orders by user">
						<label
							htmlFor="user-select-filter"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Filter by User:
						</label>
						<select
							id="user-select-filter"
							value={selectedUser}
							onChange={(e) => setSelectedUser(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
							aria-describedby="filter-description"
							aria-expanded="false"
						>
							<option value="">All Users</option>
							<option value="alice">Alice</option>
							<option value="bob">Bob</option>
							<option value="charlie">Charlie</option>
						</select>
						<div id="filter-description" className="sr-only">
							Use this dropdown to filter orders by specific user. Select "All
							Users" to view all orders.
						</div>
					</form>
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
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									Order ID
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									User
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									Total
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<tr>
									<td
										colSpan={4}
										className="px-4 py-8 text-center text-gray-600"
									>
										<div role="status" aria-live="polite">
											Loading orders...
										</div>
									</td>
								</tr>
							) : filteredOrders.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="px-4 py-8 text-center text-gray-600"
									>
										<div role="status" aria-live="polite">
											No orders found for the selected filter.
										</div>
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
										<td className="px-4 py-3 text-gray-900 capitalize">
											{order.user}
										</td>
										<td className="px-4 py-3 text-gray-900 font-medium">
											${order.total}
										</td>
										<td className="px-4 py-3">
											<span
												className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
													order.status === "Delivered"
														? "bg-green-100 text-green-800"
														: order.status === "Shipped"
															? "bg-blue-100 text-blue-800"
															: "bg-yellow-100 text-yellow-800"
												}`}
												role="status"
												aria-label={`Order status: ${order.status}`}
											>
												<span aria-hidden="true">
													{order.status === "Delivered" && "✓ "}
													{order.status === "Shipped" && "📦 "}
													{order.status === "Pending" && "⏳ "}
												</span>
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
					type="button"
					className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
					aria-label="Export orders data"
					onClick={() => {
						// Export functionality would be implemented here
						console.log("Exporting orders data...");
					}}
				>
					Export Orders
				</button>
			</section>
		</main>
	);
}
