const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config() 

const path = require('path'); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

const downloadRouter = require('./routes/download')
app.use('/download', downloadRouter) 

const port = process.env.PORT || 3000 
app.listen(port, () => {
    console.log(`We are running at http://localhost:${port}`)
})  