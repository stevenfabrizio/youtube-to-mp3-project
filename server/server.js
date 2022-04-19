//from mostly https://github.com/fent/node-ytdl-core/blob/master/example/convert_to_mp3.js
const express = require('express')
const app = express()
const port = 3000
// const readline = require('readline');
// const ytdl = require('ytdl-core');
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);

//i don't know if i actually need cors 
const cors = require('cors')

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

const downloadRouter = require('./routes/download')

app.use('/download', downloadRouter)

app.listen(port, () => {
    console.log(`We are running on port ${port}`)
})