import express, { urlencoded } from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { ConnectDB } from './lib/db.js'
import cors from 'cors'
import {app, server} from './lib/socket.js'
import path from 'path'
dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(urlencoded({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
}

server.listen(PORT, ()=>{
    ConnectDB()
    console.log('server is running on port PORT:' + PORT)
})