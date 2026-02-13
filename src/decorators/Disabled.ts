import { CONTROLLER, ROUTES } from "@/constants";
import type { Condition } from "@/types/Condition";
import type { Constructor } from "@/types/Constructor";
import type { ControllerMeta, RouteMeta } from "@/types/Meta";

export function Disabled(disabled: Condition) {
	function disabledDecorator(
		target: object,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor,
	): void;

	function disabledDecorator<T extends Constructor>(target: T): void;

	function disabledDecorator(
		target: object | Constructor,
		propertyKey?: string | symbol,
		descriptor?: PropertyDescriptor,
	) {
		if (propertyKey && descriptor) {
			const routes: Array<RouteMeta> = Reflect.getMetadata(
				ROUTES,
				target.constructor,
			) as Array<RouteMeta>;
			if (!routes)
				throw new Error(`Class ${target} is not decorated with @Controller`);

			const route = routes.find((r) => r.name === propertyKey);
			if (route) {
				route.disabled = disabled;
			}
		} else {
			const controllerMeta = Reflect.getMetadata(
				CONTROLLER,
				target,
			) as ControllerMeta;
			if (controllerMeta) {
				controllerMeta.disabled = disabled;
			} else
				throw new Error(`Class ${target} is not decorated with @Controller`);
		}
	}

	return disabledDecorator;
}
