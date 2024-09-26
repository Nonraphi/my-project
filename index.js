import express from 'express';
import IndexConfig from './src/index.config.js'
import IndexRouter from './src/index.route.js'
import IndexMiddleware from './src/index.middleware.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname,join } from 'path';
const app = express();
app.use(IndexMiddleware)
app.use(IndexConfig)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(IndexRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const frontendPath = join(__dirname, 'UI_myproject')
app.use(express.static(frontendPath))
app.use('/', (req, res) => {
    res.sendFile(join(frontendPath, 'index.html'))
    res.status(200).json({
        success: true,
        date: {
            timestamp: new Date()
        }
    })
})

app.listen(process.env.MY_PORT, () => {
    console.log(`Server is running on port [${process.env.MY_PORT}]`)
})