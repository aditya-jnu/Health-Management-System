const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000

const express = require('express')
const app = express();

app.use(express.json());
app.use(cors())

const roomRoutes = require('./routes/roomRoute')
app.use('/api/v1',roomRoutes)

app.listen(PORT,()=>{console.log(`Listening on ${PORT}`)})
