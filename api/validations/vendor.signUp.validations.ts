import Joi from 'joi'
import { VendorInput } from "../interfaces"

const vendorSignUpValidation = (input: VendorInput) => {
    const { name, email, phone, pinCode, ownerName, address, password } = <VendorInput>input
    const joiSchema = Joi.object().keys({
        name: Joi.string().trim().required()
            .messages({
                "string.base": `Name should be a type of String`,
                "string.empty": `Name cannot be an empty field`,
                "any.required": `Name is a required.`
            }),
        ownerName: Joi.string().trim().required()
            .messages({
                "string.base": `ownerName should be a type of String`,
                "string.empty": `ownerName cannot be an empty field`,
                "any.required": `ownerName is a required.`
            }),
        address: Joi.string().trim().required()
            .messages({
                "string.base": `address should be a type of String`,
                "string.empty": `address cannot be an empty field`,
                "any.required": `address is a required.`
            }),
        pinCode: Joi.string().trim().required()
            .messages({
                "string.base": `pinCode should be a type of String`,
                "string.empty": `pinCode cannot be an empty field`,
                "any.required": `pinCode is a required.`
            }),
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Please enter Correct Email ["com", "net", "in", "co"]`
            }),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).min(6).required()
            .messages({
                "string.base": `Password should be a type of Text`,
                "string.pattern.base": `Password must be minimum 6 Characters and one letter and one number! `,
                "string.empty": `Password cannot be an empty field`,
                "any.required": `Password is a required.`,
            }),
        phone: Joi.string().required().min(10).max(10).regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
            .messages({
                "any.required": `Phone is a required.`,
                "string.empty": `Phone cannot be an empty field`,
                "string.min": `Phone must be 10 Digits without +880! `,
                "string.max": `Phone must be 10 Digits without +880! `,
            })
    })
    const { value, error } = joiSchema.validate({ name, email, phone, pinCode, ownerName, address, password })
    return { value, error }
}

export {vendorSignUpValidation}