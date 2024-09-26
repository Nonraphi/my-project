import express from 'express';
import cors from 'cors';
import RequestMiddleware from './middleware/request-info.middleware.js';
const IndexMiddleware = express();
IndexMiddleware.use(cors())
IndexMiddleware.use(express.urlencoded({extended:true}))
IndexMiddleware.use(express.json())
IndexMiddleware.use(RequestMiddleware)

export default IndexMiddleware