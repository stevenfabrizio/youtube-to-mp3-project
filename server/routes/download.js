const express = require('express')
const router = express.Router()

const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


router.get('/', (req, res) => { 
    let url1 = req.query.urlONE;
    let finalUrl1 = url1.split('=')
    let finalUrl11 = finalUrl1[1].split('&')
    console.log(url1 + ' becomes ' + finalUrl11[0])

    let url2 = req.query.urlTWO;
    let finalUrl2 = url2.split('=')
    let finalUrl22 = finalUrl2[1].split('&')
    console.log(url2 + ' becomes ' + finalUrl22[0])


    let stream = ytdl(finalUrl11[0], {
        quality: 'highestaudio',
    });
    let stream2 = ytdl(finalUrl22[0], {
        quality: 'highestaudio',
    });

    ytdl.getInfo(req.query.urlONE).then(info => {
        let tempString = info.videoDetails.title
        tempString = tempString.replaceAll(" ", "_")
        console.log(tempString)
    })
    // ytdl.getInfo(req.query.urlTWO).then(info => {
    //     console.log(info.videoDetails.title)
    //     // urlB.push(info.videoDetails.video_url)
    // })

    const ConvertUrl1 = () => {
        return new Promise((resolve, reject) => {
            let start1 = Date.now();

            console.log('Starting no 1...')

            ffmpeg( stream )
            .noVideo()
            // .save(`${__dirname}/${finalUrl11[0]}.mp3`)
            .save(`${__dirname}/${'one_now'}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
                resolve()
            })
            .on('progress', p => {
                readline.cursorTo(process.stderr, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(`\nNo 1 Done! - ${(Date.now() - start1) / 1000}s`);
            resolve()
            });
        })
    }

    const ConvertUrl2 = async () => {
        const result = await ConvertUrl1()  
        result

        let start2 = Date.now(); 

        console.log('Starting no 2...')

        readline.clearLine(process.stderr, 1); 
        
        ffmpeg( stream2 )
            .noVideo()
            // .save(`${__dirname}/${finalUrl22[0]}.mp3`)
            .save(`${__dirname}/${'SecondOne'}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('progress', p => {
                readline.cursorTo(process.stderr, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(`\nNo 2 Done! - ${(Date.now() - start2) / 1000}s`);
            });
    }
    ConvertUrl2()
})

module.exports = router
