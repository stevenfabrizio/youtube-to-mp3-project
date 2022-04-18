const express = require('express')
const ytdl = require('ytdl-core')
const cors = require('cors')
const port = 3000
const app = express()

app.use(cors())

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

// let info = ytdl.getInfo(videoID);
// const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
app.get('/download', (req, res) => {
    const url = req.query.url;    
    res.header("Content-Disposition", 'attachment;\  filename="Video.mp3');    
    ytdl(url, {
        format: 'mp4',
        quality: 'highestaudio',
        // format: 'audioonly'
    }).pipe(res);
});