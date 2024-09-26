import express from 'express'
const BookRouter = express.Router()
import BookController from './book.controller.js'
import { createValidator } from 'express-joi-validation'
import { CreateBookDto } from '../dto/create-book.dto.js'
import { UpdateBookDto } from '../dto/update-book.dto.js'

const validator = createValidator();

BookRouter.get('/', BookController.getBookAll)
BookRouter.get('/:id', BookController.getBookId)
BookRouter.post('/', validator.body(CreateBookDto), BookController.postBook)
BookRouter.put('/:id', validator.body(UpdateBookDto), BookController.updateBook)
BookRouter.delete('/:id', BookController.deleteBook)

export default BookRouter