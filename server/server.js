//from mostly https://github.com/fent/node-ytdl-core/blob/master/example/convert_to_mp3.js
const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(cors())
app.listen(port, () => {
    console.log(`We are running on port ${port}`)
})
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

ffmpeg.setFfmpegPath(ffmpegPath);
app.get('/download', (req, res) => {
    let url1 = req.query.url1;
    let finalUrl1 = url1.split('=')
    let finalUrl11 = finalUrl1[1].split('&')
    console.log(url1 + ' becomes ' + finalUrl11[0])

    let url2 = req.query.url2;
    let finalUrl2 = url2.split('=')
    let finalUrl22 = finalUrl2[1].split('&')
    console.log(url2 + ' becomes ' + finalUrl22[0])



    let stream = ytdl(finalUrl11[0], {
        quality: 'highestaudio',
    });
    let stream2 = ytdl(finalUrl22[0], {
        quality: 'highestaudio',
    });

    const ConvertUrl1 = () => {
        return new Promise((resolve, reject) => {
            let start1 = Date.now();
            console.log('Starting no 1...')

            ffmpeg( stream )
            .noVideo()
            .save(`${__dirname}/${finalUrl1[1]}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
                resolve()
            })
            .on('progress', p => {
              readline.cursorTo(process.stdout, 0);
              process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
              console.log(`\nNo 1 Done! - ${(Date.now() - start1) / 1000}s`);
            //   process.stdout.destroy()
              resolve()
            });
        })
    }

    const ConvertUrl2 = async () => {
        const result = await ConvertUrl1()
        result
        let start2 = Date.now();
        console.log('Starting no 2...')
        
        ffmpeg( stream2 )
            .noVideo()
            .save(`${__dirname}/${finalUrl2[1]}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('progress', q => {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${q.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(`\nNo 2 Done! - ${(Date.now() - start2) / 1000}s`);
            });
    }
    ConvertUrl2()
});