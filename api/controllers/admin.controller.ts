import { Request, Response, NextFunction } from 'express';
import { VendorInput } from '../interfaces';
import { createVendor, getAllVendors, getSingleVendor } from '../services';
import {vendorSignUpValidation} from '../validations'
import error from '../utils/error/error';
import { VendorModel } from '../models';
import { VendorDoc } from '../models';
import { passwordHash } from '../utils';
import { Types } from 'mongoose';
export default class AdminController {
    constructor() { }

    async vendorSignUp(req: Request, res: Response, next: NextFunction) {
        const { name, email, phone, pinCode, ownerName, address, password } = <VendorInput>req.body

        const validator: any = await vendorSignUpValidation(req.body)
        //console.log(validator.error)
        if (validator.error) return error().resourceError(res, validator.error?.details[0].message, 422)

        const vendor: any = await VendorModel.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (vendor) return error().resourceError(res, 'Email Or Phone already exists. Please choose a different Email Or Phone Number', 409)

        const hashPassword: string = await passwordHash(password)
        const newVendor: VendorDoc = await createVendor({
            name, email, phone, address, pinCode, ownerName, password: hashPassword, rating: 0, serviceAvailable: false, coverImages: []
        })
        return res.status(200).json(newVendor)
    }
    async getAllVendors(req: Request, res: Response, next: NextFunction) {
        const vendors = await getAllVendors()
        return res.status(200).json(vendors)
    }
    async getSingleVendor(req: Request, res: Response, next: NextFunction) {
        const id: (Types.ObjectId | string | undefined) = req.params?.id
        //console.log(typeof id)
        if (!id) return error().resourceError(res, 'Please Provide Correct Vendor Id', 409)

        const vendor = await getSingleVendor(id)
        if (!vendor) return error().resourceError(res, 'Vendor Not Found', 409)

        return res.status(200).json(vendor)
    }
}