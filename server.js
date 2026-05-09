import express from 'express'

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World! Server is up")
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})