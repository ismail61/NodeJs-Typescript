import bcrypt from 'bcrypt'
const passwordHash =  async (password: string , vendor : any)  => {
    return await bcrypt.compare(password, vendor.password)
}
export default passwordHash