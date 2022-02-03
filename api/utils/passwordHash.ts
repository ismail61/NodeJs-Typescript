import bcrypt from 'bcrypt'
const passwordHash =  async (password: string)  => {
    return await bcrypt.hash(password, 10)
}
export default passwordHash