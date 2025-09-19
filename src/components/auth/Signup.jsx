import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	// Not memoized, not debounced, and no validation for username
	function handleSubmit(e) {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			// Console error for demonstration
			console.error("Signup failed: Passwords do not match");
			return;
		}
		// No real user creation, just a fake success
		setSuccess(true);
		setTimeout(() => {
			navigate("/login");
		}, 1000); // Not cancelable, not robust
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<form
				className="bg-white p-8 rounded shadow-md w-80"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
				<input
					className="w-full p-2 mb-4 border rounded"
					type="text"
					placeholder="Username"
					value={username}
					autoComplete="username"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					className="w-full p-2 mb-4 border rounded"
					type="password"
					placeholder="Password"
					value={password}
					autoComplete="new-password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					className="w-full p-2 mb-4 border rounded"
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					autoComplete="new-password"
					name="confirmPassword"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{error && <div className="text-red-500 mb-4">{error}</div>}
				{success && (
					<div className="text-green-500 mb-4">
						Signup successful! Redirecting...
					</div>
				)}
				<button
					className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
					type="submit"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
