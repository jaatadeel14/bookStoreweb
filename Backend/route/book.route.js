import expres from "express"
import { getBook } from "../controller/book.controller.js"


const router = expres.Router();

router.get('/', getBook)

export default router;