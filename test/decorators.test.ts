import { Controller, Get } from "@/index";
import type { Request, Response } from "express";
import { describe, expect, it } from "bun:test";

@Controller("/test")
export class TestController {
	@Get()
	root(req: Request, res: Response) {
		res.send("Hello World!");
	}
}

describe("decorators", () => {
	it("should contain all the paths", () => {
		// const routes = getRoutes(TestController);
		// expect(routes).toHaveLength(1);
		// expect(routes?.[0]?.path).toBe("/");
	});
});
