import express from 'express'
import BookRouter from './modules/books/controllers/book.route.js'
import UserRouter from './modules/user/user.route.js'

const IndexRouter = express()

IndexRouter.use('/user', UserRouter)
IndexRouter.use('/book', BookRouter)
export default IndexRouter