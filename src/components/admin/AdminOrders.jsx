import React, { useEffect, useState } from "react";

// Intentionally slow function
function slowFilter(orders, user) {
	let result = [];
	for (let i = 0; i < 1e7; i++) {
		// waste time
	}
	for (let order of orders) {
		if (order.user === user) result.push(order);
	}
	return result;
}

// Mocked orders data
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

	// Intentionally slow and not memoized
	const filteredOrders = selectedUser
		? slowFilter(orders, selectedUser)
		: orders;

	return (
		<div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
			<h1 style={{ color: "#222", fontSize: 32 }}>Admin Orders</h1>
			<label htmlFor="user-select">User</label>
			<select
				id="user-select"
				value={selectedUser}
				onChange={(e) => setSelectedUser(e.target.value)}
				style={{ marginLeft: 8 }}
			>
				<option value="">All</option>
				<option value="alice">alice</option>
				<option value="bob">bob</option>
				<option value="charlie">charlie</option>
			</select>
			<table
				style={{ marginTop: 24, width: "80%", borderCollapse: "collapse" }}
			>
				<thead style={{ background: "#ddd" }}>
					<tr>
						<th>ID</th>
						<th>User</th>
						<th>Total</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan={4} style={{ textAlign: "center" }}>
								Loading...
							</td>
						</tr>
					) : filteredOrders.length === 0 ? (
						<tr>
							<td colSpan={4} style={{ textAlign: "center" }}>
								No orders found
							</td>
						</tr>
					) : (
						filteredOrders.map((order) => (
							<tr
								key={order.id}
								style={{
									background: order.status === "Pending" ? "#ffcccc" : "#fff",
								}}
							>
								<td>{order.id}</td>
								{/* WCAG non-compliant: no scope, no caption, no table summary, low contrast */}
								<td>{order.user}</td>
								<td>${order.total}</td>
								<td>{order.status}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{/* Visual diff: no padding, inconsistent font, missing focus styles */}
			<button style={{ marginTop: 32, background: "#222", color: "#eee" }}>
				Export Orders
			</button>
		</div>
	);
}
