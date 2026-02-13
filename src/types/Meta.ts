import type { HttpMethod } from "@/types/HttpMethod";
import type { Middleware } from "./Middleware";
import type { Condition } from "./Condition";

export type ControllerMeta = {
	path: string;
	middleware: Array<Middleware>;
	disabled: Condition;
};

export type RouteMeta = {
	path: string;
	method: HttpMethod;
	name: string | symbol;
	middleware: Array<Middleware>;
	disabled: Condition;
};
