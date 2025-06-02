import expres from "express"
import { getBook, getBookById } from "../controller/book.controller.js"


const router = expres.Router();

router.get('/', getBook)
router.get('/:id', getBookById)

export default router;