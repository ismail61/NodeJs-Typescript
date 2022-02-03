import { Schema, model } from "mongoose";
import UserInput from "../interfaces/user.interface";
const userSchema = new Schema({
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
        unique : true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        unique : true
    },
    address: [
        {
            type: String,
            default: null,
        }
    ],
    token: {
        type: String,
        default: null,
    },
    resetPasswordToken: String,
    resetPasswordTokenDate: Date,
}/* , {
    timestamps: true,
} */);


const UserModel =  model<UserInput>("User", userSchema);
export default UserModel