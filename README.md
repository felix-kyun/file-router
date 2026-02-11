# express-file-router
A small and simple file and decorator based router for Express apps. It scans and plugs the controllers to Router provided by Express.

## Usage
```typescript
import express from 'express';
import FileRouter from 'express-file-router';

const app = express();
app.use("/api", FileRouter("/controllers"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Controllers
```typescript
// controllers/userController.ts
import { Controller, Get, Post } from 'express-file-router';

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
}
```
