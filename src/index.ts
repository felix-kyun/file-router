import { Method } from "@/decorators/Method";

export { FileRouter } from "@/FileRouter";
export { Controller } from "@/decorators/Controller";

export const Get = Method("get");
export const Post = Method("post");
export const Put = Method("put");
export const Delete = Method("delete");
export const Patch = Method("patch");
