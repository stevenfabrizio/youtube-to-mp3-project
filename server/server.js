//from mostly https://github.com/fent/node-ytdl-core/blob/master/example/convert_to_mp3.js
const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/', (req, res) => {
    // res.sendFile('./public/index.html', { root: './' }) 
    res.sendFile('index.html', { root: './' })
})

const downloadRouter = require('./routes/download')
app.use('/download', downloadRouter)

const port = 3000
app.listen(port, () => {
    console.log(`We are running on port ${port}`)
})