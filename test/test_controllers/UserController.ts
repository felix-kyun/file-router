import { Middleware } from "@/decorators/Middleware";
import { Controller, Get, Post } from "@/index";
import type { Middleware as IMiddleware } from "@/types/Middleware";

const testMiddleware: IMiddleware = (req, res, next) => {
	console.log("Test middleware executed");
	next();
};

@Middleware(testMiddleware)
@Controller("/users")
export class UserController {
	@Get()
	async getAllUsers(req: Request, res: Response) {}

	@Post()
	createUser(req: Request, res: Response) {}

	@Get("/:id")
	getUserById(req: Request, res: Response) {}
}
