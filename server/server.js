const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path'); 

// app.use(express.static(path.join(__dirname, '../server.public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.get('/', (req, res) => {
    // res.sendFile('./public/index.html', { root: './' }) 
    res.sendFile('index.html', { root: './' })
})

const downloadRouter = require('./routes/download')
app.use('/download', downloadRouter)

const port = process.env.PORT || 5000 
app.listen(port, () => {
    console.log(`We are running on port ${port}`)
})