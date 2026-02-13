export class DirectoryNotFound extends Error {
	public path: string;
	constructor(path: string) {
		super(`Controller directory doesn't exist`);
		this.name = "DirectoryNotFound";
		this.path = path;
		Object.setPrototypeOf(this, DirectoryNotFound.prototype);
	}
}
