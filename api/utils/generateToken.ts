import jwt from 'jsonwebtoken'
import { VendorPayload } from '../interfaces'
//import jwtToken from '../../config/config'

const token = (payload: VendorPayload) => {
    const ONE_DAY = '24h'
    const signature: string = jwt.sign(payload, process.env.TOKEN_KEY as string, {
        expiresIn: ONE_DAY
    })
    return signature
}
export default token