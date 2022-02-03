import { Schema, model, Document, Types } from "mongoose";

export interface VendorDoc extends Document {
    name: string,
    ownerName: string,
    pinCode: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    serviceAvailable: boolean,
    coverImages?: [string],
    rating: number,
    token?: string,
    resetPasswordToken?: string,
    resetPasswordTokenDate?: Date,
    /* foods?: Types.ObjectId */
}
const userSchema = new Schema<VendorDoc>({
    name: { type: String, required: true, trim: true, },
    ownerName: { type: String, required: true },
    pinCode: { type: String, required: true },
    email: { type: String, require: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true, },
    phone: { type: String, required: true, unique: true },
    address: { type: String },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    /* foods: [{
        type: Types.ObjectId,
        ref: 'food'
    }], */
    token: { type: String },
    resetPasswordToken: String,
    resetPasswordTokenDate: Date,
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password,
                delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt
        }
    },
    timestamps: true,
});


const VendorModel = model<VendorDoc>("Vendor", userSchema);
export {VendorModel}