import { Router } from 'express';
import { VendorController } from '../controllers';
import {vendorMiddleware} from '../middlewares';
import { tryCatchHandle } from '../utils';
class VendorRoutes {
    router: Router = Router();
    vendorController = new VendorController()
    constructor() {
        this.initializeVendorRoutes()
    }
    private initializeVendorRoutes() {
        this.router.post('/sign-in', tryCatchHandle(this.vendorController.vendorSignIn))
        this.router.use(vendorMiddleware)
        this.router.get('/profile', tryCatchHandle(this.vendorController.getProfile))
        this.router.patch('/profile', tryCatchHandle(this.vendorController.updateProfile))
        this.router.patch('/service', tryCatchHandle(this.vendorController.updateService))

        //Foods
        this.router.post('/food', tryCatchHandle(this.vendorController.addFood))
    }
}
export default new VendorRoutes().router;