import { VendorDoc } from "../models";
import { VendorModel } from "../models";
import { Types } from "mongoose";
import { VendorEditInput } from "../interfaces";
export async function createVendor(input: Object): Promise<VendorDoc> {
    try {
        const vendor: VendorDoc = await VendorModel.create(input);
        return vendor;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function getAllVendors(): Promise<any> {
    try {
        const vendors = await VendorModel.find();
        return vendors;
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export async function getSingleVendor(id: (Types.ObjectId | string)): Promise<any> {
    try {
        const vendor = await VendorModel.findOne({ _id: id });
        return vendor;
    } catch (e: any) {
        throw new Error(e.message);
    }
}
export async function updateProfile(id: (Types.ObjectId | string | undefined), input: VendorEditInput): Promise<any> {
    try {
        const updateVendor = await VendorModel.findOneAndUpdate({ _id: id }, input, { new: true })
        return updateVendor;
    } catch (e: any) {
        throw new Error(e.message);
    }
}
export async function updateService(id: (Types.ObjectId | string | undefined)): Promise<any> {
    try {
        const vendor:any = await VendorModel.findOne({_id : id})
        const updateVendor = await VendorModel.findOneAndUpdate({ _id: id }, {serviceAvailable : !vendor.serviceAvailable}, { new: true })
        return updateVendor;
    } catch (e: any) {
        throw new Error(e.message);
    }
}
export async function createFoodItem(id: (Types.ObjectId | string | undefined)): Promise<any> {
    try {
        const vendor:any = await VendorModel.findOne({_id : id})
        const updateVendor = await VendorModel.findOneAndUpdate({ _id: id }, {serviceAvailable : !vendor.serviceAvailable}, { new: true })
        return updateVendor;
    } catch (e: any) {
        throw new Error(e.message);
    }
}