import { Request, Response, NextFunction } from 'express';
export default (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (err: any) {
            //console.log(err.stack)
            console.log("Error: " + err + " on route " + req?.url + " & Request " + req?.method)
            //return next(error().serverError(res))
        }
    };
};