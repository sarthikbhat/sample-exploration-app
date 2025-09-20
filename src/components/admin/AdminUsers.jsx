import React, { useEffect, useState, useMemo } from "react";

// Fixed: Efficient function
function fastMap(users) {
	return users.map((user) => ({ ...user }));
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
			// Fixed: Use console.log for successful data fetch
			console.log("Successfully fetched users data");
		}, 1000);
	}, []);

	// Fixed: Memoized for performance
	const allUsers = useMemo(() => fastMap(users), [users]);

	return (
		<main className="min-h-screen bg-gray-50 p-4">
			<a
				href="#admin-users-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded focus:z-50"
			>
				Skip to main content
			</a>
			<header>
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Users</h1>
			</header>
			<section id="admin-users-content" aria-labelledby="admin-users-heading">
				<h2 id="admin-users-heading" className="sr-only">
					Users Management
				</h2>
				<div className="overflow-x-auto">
					<table
						className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
						role="table"
						aria-label="Users management table"
					>
						<caption className="sr-only">
							Table showing all users with their details and roles
						</caption>
						<thead className="bg-gray-100">
							<tr>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									ID
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									Email
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left font-semibold text-gray-700"
								>
									Role
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
										<div role="status" aria-live="polite" aria-busy="true">
											<span className="sr-only">
												Loading users data, please wait...
											</span>
											<span aria-hidden="true">⏳</span> Loading users...
										</div>
									</td>
								</tr>
							) : allUsers.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="px-4 py-8 text-center text-gray-600"
									>
										<div role="status" aria-live="polite">
											No users found in the system.
										</div>
									</td>
								</tr>
							) : (
								allUsers.map((user) => (
									<tr
										key={user.id}
										className={`border-t hover:bg-gray-50 transition-colors ${
											user.role === "admin" ? "bg-amber-50" : "bg-white"
										}`}
										role="row"
										aria-describedby={`user-${user.id}-description`}
									>
										<td className="px-4 py-3 text-gray-900">{user.id}</td>
										<td className="px-4 py-3 text-gray-900 capitalize">
											{user.name}
										</td>
										<td className="px-4 py-3 text-gray-900">{user.email}</td>
										<td className="px-4 py-3">
											<span
												className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
													user.role === "admin"
														? "bg-amber-100 text-amber-900 border border-amber-200"
														: "bg-blue-100 text-blue-900 border border-blue-200"
												}`}
												role="status"
												aria-label={`User role: ${user.role}${user.role === "admin" ? " (administrator privileges)" : " (standard user)"}`}
											>
												<span aria-hidden="true">
													{user.role === "admin" && "👑 "}
													{user.role === "user" && "👤 "}
												</span>
												{user.role}
											</span>
											<div
												id={`user-${user.id}-description`}
												className="sr-only"
											>
												User {user.name} with {user.role} role and email{" "}
												{user.email}
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				<button
					type="button"
					className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800 transition-colors duration-200"
					aria-label="Export users data to file"
					onClick={() => {
						// Export functionality would be implemented here
						console.log("Exporting users data...");
					}}
				>
					Export Users
				</button>
			</section>
		</main>
	);
}
