export type Methods = "get" | "post" | "put" | "delete" | "patch";

export type Constructor<T = any> = new (...args: unknown[]) => T;

export type RouteMeta = {
	path: string;
	method: Methods;
	name: string | symbol;
};
