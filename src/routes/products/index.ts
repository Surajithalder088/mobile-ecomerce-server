import express from "express"
import { getLists ,getProductById ,createProduct,updateProduct,deleteProduct} from "../../controllers/products/index";
const router=express.Router()

router.get("/",getLists)
router.get("/:id",getProductById)
router.post("/",createProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export default router;