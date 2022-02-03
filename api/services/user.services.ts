import UserInput from "../interfaces/user.interface";
import UserModel from "../models/user.model";
export async function createUser(input: UserInput) {
    try {
        const user = await UserModel.create(input);
        return user;
    } catch (e: any) {
        throw new Error(e.message);
    }
}