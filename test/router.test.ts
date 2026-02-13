import { FileRouter } from "@/FileRouter";
import { describe, expect, it } from "bun:test";

describe("router", () => {
	it("should work?", async () => {
		const router = await FileRouter("test_controllers", import.meta.url);
	});
});
