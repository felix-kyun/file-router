import { FileRouter } from "@/FileRouter";
import { describe, expect, it } from "bun:test";

describe("router", () => {
	it("should work?", () => {
		const router = FileRouter("./test/test_controllers");
	});
});
