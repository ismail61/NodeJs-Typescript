import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { VendorModel } from '../models';

const vendorMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    const token:(string|undefined) = req.header('Authorization') || req.get('Authorization') || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.json({ err: "Access-denied" });
    }
    try {
        const verify_token:any = await jwt.verify(token as string, process.env.TOKEN_KEY as string);
        const vendor = await VendorModel.findOne({ _id: verify_token._id, token: verify_token.verifyToken })
        if (!vendor) return res.json({ err: "Invalid Token" });
       /*  if (vendor?.activated === false) return res.json({ err: 'Your account has not been activated. Please contact Super Admin or Administrator' }) */
        (req as any).user = verify_token;
    } catch (err) {
        console.log(err)
        return res.json({ err: "Invalid Token" });
    }
    return next();
};

export {vendorMiddleware};