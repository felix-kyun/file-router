import { DirectoryNotFound } from "@/errors/DirectoryNotFound";
import { access } from "node:fs/promises";

export async function ensureDirectoryExists(path: string): Promise<void> {
	try {
		await access(path);
	} catch (error: unknown) {
		if (
			error instanceof Error &&
			(error as NodeJS.ErrnoException)?.code === "ENOENT"
		)
			throw new DirectoryNotFound(path);

		throw error;
	}
}
