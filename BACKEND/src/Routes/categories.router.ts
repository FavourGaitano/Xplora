import {Router} from "express"
import {createCategory, getAllCategories, getOneCategory, updateCategory, deleteCategory} from "../Controller/categories.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const categoryRouter = Router()

categoryRouter.post('/', createCategory)
categoryRouter.get('/get' , verifyToken, getAllCategories)
categoryRouter.get("/:category_id" , verifyToken, getOneCategory)
categoryRouter.put("/update/:category_id" , verifyToken, updateCategory);
categoryRouter.delete("/:category_id" , verifyToken, deleteCategory);


export default categoryRouter