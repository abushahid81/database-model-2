// importing packages
import express from 'express';
import homeRouter from './routes/home.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import noteRouter from './routes/note.routes.js'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const app = express();

app.use(express.json())
app.use(cors())


app.use('/', homeRouter)


app.use('/notes', noteRouter)
app.use('/users', userRouter)



const PORT = 5002
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})