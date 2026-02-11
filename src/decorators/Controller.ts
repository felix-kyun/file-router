import "reflect-metadata";
import { CONTROLLER } from "@/constants";
import type { Constructor } from "@/types";

export function Controller(path: string = "/") {
	return (target: Constructor): void => {
		Reflect.defineMetadata(CONTROLLER, path, target);
	};
}
