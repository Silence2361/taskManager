import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import db from './db.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'


dotenv.config()

const app = express()

const PORT = process.env.PORT

// app.use(bodyParser.json())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)



app.get('/', (req,res)=> {
    res.json({
        message: "Task Manager API is working!"
    }) 
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}` )
})