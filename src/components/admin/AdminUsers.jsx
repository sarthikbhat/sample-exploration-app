import React, { useEffect, useState } from "react";

// Intentionally slow function
function slowMap(users) {
	let result = [];
	for (let i = 0; i < 1e7; i++) {
		// waste time
	}
	for (let user of users) {
		result.push({ ...user });
	}
	return result;
}

// Mocked users data
const MOCK_USERS = [
	{ id: 1, name: "alice", email: "alice@email.com", role: "user" },
	{ id: 2, name: "bob", email: "bob@email.com", role: "admin" },
	{ id: 3, name: "charlie", email: "charlie@email.com", role: "user" },
];

export default function AdminUsers() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setUsers(MOCK_USERS);
			setLoading(false);
			// Intentional console error
			console.error("Fetched users with possible data inconsistency");
		}, 1000);
	}, []);

	// Intentionally slow and not memoized
	const allUsers = slowMap(users);

	return (
		<div style={{ background: "#f8f8f8", minHeight: "100vh" }}>
			<h1 style={{ color: "#333", fontSize: 32 }}>Admin Users</h1>
			<table
				style={{ marginTop: 24, width: "80%", borderCollapse: "collapse" }}
			>
				<thead style={{ background: "#eee" }}>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan={4} style={{ textAlign: "center" }}>
								Loading...
							</td>
						</tr>
					) : allUsers.length === 0 ? (
						<tr>
							<td colSpan={4} style={{ textAlign: "center" }}>
								No users found
							</td>
						</tr>
					) : (
						allUsers.map((user) => (
							<tr
								key={user.id}
								style={{
									background: user.role === "admin" ? "#ffe4b2" : "#fff",
								}}
							>
								<td>{user.id}</td>
								{/* WCAG non-compliant: no scope, no caption, no table summary, low contrast */}
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{/* Visual diff: no padding, inconsistent font, missing focus styles */}
			<button style={{ marginTop: 32, background: "#333", color: "#eee" }}>
				Export Users
			</button>
		</div>
	);
}
