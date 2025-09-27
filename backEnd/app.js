import express from 'express';
const app = express();
import dotenv from 'dotenv'
import cors from 'cors';
import authRouter from './Routes/authRoute.js'
import postRouter from './Routes/postRoute.js'
import userRouter from './Routes/userRoute.js'
import DBconnection from './DBConnection.js';
import cookieParser from 'cookie-parser';
import errorHandler from './Middlewares/errorHandler.js';

dotenv.config()

const PORT = process.env.PORT || 3000

app.use(cors(
    { origin: "https://full-stack-blog-website-omega.vercel.app",
    // { origin: true,
        credentials: true
    }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/user', userRouter)

    
    
   app.get("/check-token", (req, res) => {
  console.log("Token from cookie:", req.cookies.Token);
  res.send("Check terminal for cookie token.");
});
    
    DBconnection()



app.use(errorHandler)

app.listen(PORT,()=>{
console.log(`server is running on ${PORT}`)
})