//from mostly https://github.com/fent/node-ytdl-core/blob/master/example/convert_to_mp3.js
const express = require('express')
const cors = require('cors')
const port = 3000
const app = express()
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const readline = require('readline');
const ytdl = require('ytdl-core');

app.use(cors())

app.listen(port, () => {
    console.log(`We are running on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

app.get('/download', (req, res) => {
    let url = req.query.url;
    let finalUrl = url.split('=')
    console.log(url + '...' +'\n...becomes ' + finalUrl[1])

    let stream = ytdl(finalUrl[1], {
        quality: 'highestaudio',
    });

    let start = Date.now();
    ffmpeg( stream )
        .noVideo()
        .save(`${__dirname}/${finalUrl[1]}.mp3`)
        .on('connection', (stream) => {
            console.log('Beginning download, do not close window...')
        })
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('progress', p => {
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('end', () => {
          console.log(`\nDone! - ${(Date.now() - start) / 1000}s`);
        });
});