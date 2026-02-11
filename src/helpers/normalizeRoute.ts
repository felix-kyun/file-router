/*
 * Normalize direrctory path to express route
 * example: /users/[id]/posts/ -> /users/:id/posts/
 */
export function normalizeRoute(path: string) {
	return path.replace(/\[([^\/\[\]]+)\]/g, ":$1");
}
