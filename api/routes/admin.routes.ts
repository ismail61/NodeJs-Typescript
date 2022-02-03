import { Router } from 'express';
import { AdminController } from '../controllers';
import {tryCatchHandle} from '../utils';
class AdminRoutes {
    router: Router = Router();
    adminController = new AdminController()
    constructor() {
        this.initializeAdminRoutes()
    }
    private initializeAdminRoutes() {
        this.router.post('/vendor/sign-up', tryCatchHandle(this.adminController.vendorSignUp))
        this.router.get('/vendors', tryCatchHandle(this.adminController.getAllVendors))
        this.router.get('vendor/:id', tryCatchHandle(this.adminController.getSingleVendor))
    }
}
export default new AdminRoutes().router;