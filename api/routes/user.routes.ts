import { Router } from 'express';
import { UserController } from '../controllers';
import { tryCatchHandle } from '../utils';
class UserRoutes {
    router: Router = Router();
    userController = new UserController()
    constructor() {
        this.initializeUserRoutes()
    }
    private initializeUserRoutes() {
        this.router.post('/sign-in', tryCatchHandle(this.userController.userSignIn))
        this.router.post('/sign-up', tryCatchHandle(this.userController.userSignUp))
    }
}
export default new UserRoutes().router;