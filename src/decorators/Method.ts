import "reflect-metadata";
import { ROUTES } from "@/constants";
import type { Methods, RouteMeta } from "@/types";

export function Method(method: Methods) {
	return function (path: string = "/"): MethodDecorator {
		return <T>(
			target: Object,
			propertyKey: string | symbol,
			_descriptor: TypedPropertyDescriptor<T>,
		): void => {
			const routes: RouteMeta[] =
				Reflect.getMetadata(ROUTES, target.constructor) || [];
			routes.push({ path, method, name: propertyKey });
			Reflect.defineMetadata(ROUTES, routes, target.constructor);
		};
	};
}
