import { describe, expect, it } from "vitest";
import loaderSlice from "../slices/loading";

describe("test loader slice", () => {
	it("loader slice test : false", async () => {
		const loaderSliceTest = loaderSlice(false, { type: "unknown" });
		expect(loaderSliceTest).toBe(false);
	});
    it("loader slice test : true", async () => {
		const loaderSliceTest = loaderSlice(true, { type: "unknown" });
		expect(loaderSliceTest).toBe(true);
	});
});
