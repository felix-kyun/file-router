import "reflect-metadata";
import { Router } from "express";
import { resolve, relative, join, dirname } from "node:path";
import { glob } from "node:fs/promises";
import { log } from "@/helpers/log";
import { ensureDirectoryExists } from "@/helpers/ensureDirectoryExists";
import { CONTROLLER, ROUTES } from "@/constants";
import type { Constructor, RouteMeta } from "@/types";
import { normalizeRoute } from "@/helpers/normalizeRoute";

export async function FileRouter(directory: string): Promise<Router> {
	const router = Router();

	const path = resolve(directory);
	ensureDirectoryExists(path);

	const files = glob(`${path}/**/*.{ts,js}`);
	for await (const file of files) {
		log(() => `Loading ${relative(path, file)}`);

		const module = await import(file);
		const baseRoute = join("/", dirname(relative(path, file)));

		Object.values(module).forEach((e) => {
			if (typeof e !== "function") return;

			const controllerRoute = Reflect.getMetadata(CONTROLLER, e);
			if (controllerRoute === undefined) return;

			const instance = new (e as Constructor)();
			const routes = (Reflect.getMetadata(ROUTES, e) ?? []) as RouteMeta[];
			routes.forEach(({ path, method, name }) => {
				const fullPath = normalizeRoute(join(baseRoute, controllerRoute, path));

				log(() => `Registering ${method.toUpperCase()} ${fullPath}`);

				router[method](fullPath, instance[name].bind(instance));
			});
		});
	}

	return router;
}
