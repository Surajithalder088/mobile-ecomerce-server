import express from "express"
import { getOrders,getOrdersByProduct,makeOrder} from "../../controllers/orders/index.js";
import { verifyUser } from "../../middleware/auth.middleware.js";
const router=express.Router()

router.get('/',verifyUser,getOrders)
router.get('/:productId',verifyUser,getOrdersByProduct)  // find all the orders by a single product id
router.post('/',verifyUser,makeOrder)

export default router;