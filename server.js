import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import routes from './routes/auth.js'

dotenv.config()
const app = express()
connectDB();

app.use(express.json())

app.use("/api/auth", routes);

app.get("/", (req, res) => {
    res.send("Hello World! Server is up")
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})