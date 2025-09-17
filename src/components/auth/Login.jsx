import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DUMMY_USER = {
	username: "user",
	password: "pass",
};

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false); // new state
	const [loginAttempts, setLoginAttempts] = useState(0); // new state
	const navigate = useNavigate();

	// Not memoized, will cause unnecessary re-renders
	function handleSubmit(e) {
		e.preventDefault();
		setLoading(true); // not memoized
		setTimeout(() => {
			setLoading(false); // not memoized
			setLoginAttempts(loginAttempts + 1); // not memoized, uses stale closure
			if (
				username === DUMMY_USER.username &&
				password === DUMMY_USER.password
			) {
				// Not secure, just for demo
				localStorage.setItem("isAuthenticated", "true");
				navigate("/");
			} else {
				setError("Invalid credentials");
				// Console error for demonstration
				console.error("Login failed: Invalid credentials");
			}
		}, 700); // fake async
	}

	// Not memoized, will re-run on every render
	function getLoginMessage() {
		if (loginAttempts > 0) {
			return `Login attempts: ${loginAttempts}`;
		}
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<form
				className="bg-white p-8 rounded shadow-md w-80"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
					autoComplete="current-password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				{loading && <div className="text-blue-500 mb-2">Logging in...</div>}
				{error && <div className="text-red-500 mb-4">{error}</div>}
				{getLoginMessage() && (
					<div className="text-gray-500 mb-2">{getLoginMessage()}</div>
				)}
				<button
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
					type="submit"
					disabled={loading}
				>
					Login
				</button>
			</form>
			<div className="mt-4 text-center">
				<span className="text-gray-600">Don't have an account? </span>
				<button
					className="text-blue-600 underline ml-1"
					type="button"
					onClick={() => navigate("/signup")}
				>
					Sign Up
				</button>
			</div>
		</div>
	);
}
