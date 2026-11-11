import express from "express"
import { configDotenv } from "dotenv"
import userRouter from "./routers/users.js"

configDotenv()

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(process.env.PORT, () => {
    console.log("Server is running...")
})