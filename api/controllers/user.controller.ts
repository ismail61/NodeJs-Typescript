import { Request, Response, NextFunction } from 'express';
import UserInput from '../interfaces/user.interface';

export default class UserController {
    constructor() { }

    async userSignIn(req: Request, res: Response, next: NextFunction) {
        res.json("Ismail hosen")
    }
    async userSignUp(req: Request, res: Response, next: NextFunction) {
      /*   const user = await createUser(req.body as UserInput)
        return res.status(200).json(user) */
    }
}