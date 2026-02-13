export class MissingMeta extends Error {
	constructor(target: Function) {
		super(
			`Class Metadata not found for ${target.name}. Did you forget to decorate the class with @Controller?`,
		);
		this.name = "MissingMeta";
		Object.setPrototypeOf(this, MissingMeta.prototype);
	}
}
