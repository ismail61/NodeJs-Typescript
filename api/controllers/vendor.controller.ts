import { Request, Response, NextFunction } from 'express';
import { createFoodItem, getSingleVendor, updateProfile, updateService } from '../services';
import { vendorSignInValidation } from '../validations';
import error from '../utils/error/error';
import { VendorModel } from '../models';
import { VendorDoc } from '../models';
import { passwordCompare, tokenGenerate } from '../utils';
import { VendorEditInput, VendorLoginInput } from '../interfaces';
import crypto from 'crypto'
export default class VendorController {
    constructor() { }

    async vendorSignIn(req: Request, res: Response, next: NextFunction) {
        const { email, password } = <VendorLoginInput>req.body
        const validator: any = await vendorSignInValidation(req.body)
        //console.log(validator.error)
        if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)

        const vendor = await VendorModel.findOne({ email })
        if (!vendor) return error().resourceError(res, 'Invalid Credentials', 401)

        const passwordMatch: boolean = await passwordCompare(password, vendor)
        if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials', 401)

        /* if (vendor?.activated === false) return error().resourceError(res, 'Your account has not been activated. Please contact Super Admin or Administrator', 401) */

        const verifyTokenTracker: string = await crypto.randomBytes(8).toString("hex")
        const token: string = await tokenGenerate({ _id: vendor._id, verifyTokenTracker: verifyTokenTracker })

        await VendorModel.findByIdAndUpdate(vendor._id, { token: verifyTokenTracker }, { new: true })
        res.status(200).json({ token: token })
    }

    async getProfile(req: any, res: Response, next: NextFunction) {
        const vendor = await req.user
        const getVendor: VendorDoc = await getSingleVendor(vendor._id)
        return res.status(200).json(getVendor)
    }
    async updateProfile(req: any, res: Response, next: NextFunction) {
        const { _id } = await req.user
        const { name, ownerName, phone, address } = <VendorEditInput>req.body
        const getVendor: VendorDoc = await updateProfile(_id, { name, ownerName, phone, address })
        return res.status(200).json(getVendor)
    }
    async updateService(req: any, res: Response, next: NextFunction) {
        const { _id } = await req.user

        const getVendor: VendorDoc = await updateService(_id)
        return res.status(200).json(getVendor)
    }
    async addFood(req: any, res: Response, next: NextFunction) {
        const { _id } = await req.user

        const getVendor: VendorDoc = await createFoodItem(_id)
        return res.status(200).json(getVendor)
    }
}