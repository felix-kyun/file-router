export class MissingMethod extends Error {
	constructor(name: string | symbol) {
		super(
			`Method ${name.toString()} is not decorated with a HTTP method decorator`,
		);
		this.name = "MissingMethod";
		Object.setPrototypeOf(this, MissingMethod.prototype);
	}
}
