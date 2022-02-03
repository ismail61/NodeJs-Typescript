import { Application } from "express";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import vendorRoutes from "./vendor.routes";
export default class Routes {
    constructor(app: Application) {
        app.use('/api/v1/user',userRoutes)
        app.use('/api/v1/admin',adminRoutes)
        app.use('/api/v1/vendor',vendorRoutes)
    }
}