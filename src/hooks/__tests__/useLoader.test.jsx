import { describe, expect, it } from "vitest";
import { useLoader } from "../useLoader";
import { renderHookWithProviders } from "../../utils/testUtils";

describe("test useLoader hook", () => {
	it("useLoader should render with initial value false", () => {
		const result = renderHookWithProviders(useLoader);
		result.result.current.setIsLoading(true);
		const loaderState = result.store.getState().loader;
		expect(loaderState).toBeTruthy();
	});
});
