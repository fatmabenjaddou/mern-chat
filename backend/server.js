const express = require('express')
const dbConnect = require('./dbConnect/dbConnect')
const userRoute = require('./routes/userRoutes')
const chatRoute = require ('./routes/chatRoutes')
const messageRoute =  require ('./routes/messageRoute')
const app = express()
const cors = require('cors')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
require('dotenv').config()
dbConnect()


app.use(cors())
app.use(express.json())
app.use('/api/user' , userRoute)
app.use('/api/chat', chatRoute)
app.use('/api/message', messageRoute)
app.use(notFound);
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))