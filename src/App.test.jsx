import { describe, expect, it } from "vitest";
import { renderHookWithProviders } from "./utils/testUtils";
import App from "./App";
import { useLoader } from "./hooks/useLoader";
import { render, screen } from "@testing-library/react";

describe("test app", () => {
	it("App tests", () => {
		render(<App />);
		const result = renderHookWithProviders(useLoader);
		result.result.current.setIsLoading(true);
		const appLoader = screen.getByTestId("app-loader");
		expect(appLoader).toBeInTheDocument();
	});
});
