# @felix-kyun/file-router
A small and simple file and decorator based router for Express apps. It scans and plugs the controllers to Router provided by Express.

## Usage
```typescript
import express from 'express';
import FileRouter from '@felix-kyun/file-router';

const app = express();
app.use("/api", await FileRouter("controllers", import.meta.url));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Controllers
```typescript
// controllers/userController.ts
import { Controller, Get, Post } from '@felix-kyun/file-router';

@Controller("/users")
export class UserController {

    @Get()
    getAllUsers(req: Request, res: Response) {
    }

    @Post()
    createUser(req: Request, res: Response) {
    }

    @Get("/:id")
    getUserById(req: Request, res: Response) {
    }

    @Disabled(() => process.env.DISABLE_DELETE)
    @Delete("/:id")
    deleteUser(req: Request, res: Response) {
    }
}
```

## Important
- use `experimentalDecorators: true` in tsconfig as the new tc39 decorators doesn't allow reflection.
- debug logs can be enabled by setting `DEBUG` env variable to `file-router`
- verbose logs can be enabled by setting `DEBUG` env variable to `file-router:*`
