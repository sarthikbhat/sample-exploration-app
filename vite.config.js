import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		sourcemap: true, // Enable source maps for production
	},
	server: {
		sourcemap: true, // Enable source maps for dev server (optional)
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.js"],
		css: true,
		globals: true,
	},
});
