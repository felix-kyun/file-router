import { Controller, Get, Post } from "@/index";

@Controller("/users")
export class UserController {
	@Get()
	getAllUsers(req: Request, res: Response) {}

	@Post()
	createUser(req: Request, res: Response) {}

	@Get("/:id")
	getUserById(req: Request, res: Response) {}
}
