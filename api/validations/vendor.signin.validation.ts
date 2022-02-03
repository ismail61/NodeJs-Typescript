import Joi from 'joi'
import { VendorLoginInput } from "../interfaces"

const vendorSignInValidation = (input: VendorLoginInput) => {
    const { email, password } = <VendorLoginInput>input
    const joiSchema = Joi.object().keys({
        email: Joi.string().lowercase()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "in", "co"], }, }).required()
            .messages({
                "string.base": `Email should be a type of String`,
                "string.empty": `Email cannot be an empty field`,
                "string.email": `Invalid Credentials!`
            }),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).min(6).required()
            .messages({
                "string.base": `Password should be a type of Text`,
                "string.pattern.base": `Invalid Credentials! `,
                "string.empty": `Password cannot be an empty field`,
                "any.required": `Password is a required.`,
            })
    })
    const { value, error } = joiSchema.validate({ email, password })
    return { value, error }
}

export {vendorSignInValidation}