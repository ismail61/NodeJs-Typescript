import { Schema, model } from "mongoose";
import AdminInput from "../interfaces/admin.interface";
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: [
        {
            type: String,
            default: null,
        }
    ],
    phone: {
        type: Number,
        required: true,
        unique : true
    },
    token: {
        type: String,
        default: null,
    },
    activated: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordTokenDate: Date,
}/* , {
    timestamps: true,
} */);

export default model<AdminInput>("Admin", adminSchema);