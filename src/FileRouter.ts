import "reflect-metadata";
import { Router } from "express";
import { resolve, relative, join, dirname } from "node:path";
import { glob } from "node:fs/promises";
import { log } from "@/helpers/log";
import { ensureDirectoryExists } from "@/helpers/ensureDirectoryExists";
import { CONTROLLER, ROUTES } from "@/constants";
import type { ControllerMeta, RouteMeta } from "@/types/Meta";
import type { Constructor } from "@/types/Constructor";
import { normalizeRoute } from "@/helpers/normalizeRoute";
import { fileURLToPath } from "node:url";

/*
 * @param directory - relative to runtime directory
 * @param callerUrl - optional, used to resolve relative paths based on the caller's location (import.meta.url)
 */

export async function FileRouter(
	directory: string,
	callerUrl?: string,
): Promise<Router> {
	const router = Router();

	if (callerUrl) {
		const callerPath = resolve(dirname(fileURLToPath(callerUrl)));
		directory = join(callerPath, directory);
	}

	const path = resolve(directory);
	ensureDirectoryExists(path);

	log(() => `Scanning directory: ${path}`);

	const files = glob(`${path}/**/*.{ts,js}`);
	for await (const file of files) {
		log(() => `Loading ${relative(path, file)}`);

		const module = await import(file);
		const baseRoute = join("/", dirname(relative(path, file)));

		Object.values(module).forEach((e) => {
			if (typeof e !== "function") return;

			const controllerMeta = Reflect.getMetadata(CONTROLLER, e) as
				| ControllerMeta
				| undefined;
			if (controllerMeta === undefined) return;

			const instance = new (e as Constructor)();
			const routes = (Reflect.getMetadata(ROUTES, e) ?? []) as RouteMeta[];

			// register
			routes.forEach(({ path, method, name, middleware }) => {
				const fullPath = normalizeRoute(
					join(baseRoute, controllerMeta.path, path),
				);

				log(
					() =>
						`Registering ${method.toUpperCase()} ${fullPath} (${controllerMeta.middleware.length + middleware.length} middlewares)`,
				);

				router[method](
					fullPath,
					...controllerMeta.middleware,
					...middleware,
					instance[name].bind(instance),
				);
			});
		});
	}

	return router;
}
