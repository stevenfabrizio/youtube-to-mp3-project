const express = require('express')
const router = express.Router()

const colors = require('colors')
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

router.get('/', (req, res) => { 
    const ConvertUrl1 = () => { 
            let url1 = req.query.urlONE;
            if (url1 === ''){
                ConvertUrl2()
                return
            }
            let finalUrl1 = url1.split('=')
            let finalUrl11 = finalUrl1[1].split('&')
            console.log('\n' + url1 + ' becomes ' + finalUrl11[0])

            let name1 = req.query.filename1
            if (req.query.filename1===''){
                name1 = 'MP3_Number_1'
            }
            name1 = name1.split(" ").join("_")

            let stream = ytdl(finalUrl11[0], {
                quality: 'highestaudio',
            });

            let start1 = Date.now();

            ytdl.getInfo(req.query.urlONE).then(info => {
                let tempString = info.videoDetails.title
                console.log(colors.yellow(tempString))
            })

            console.log(colors.yellow('\nStarting no 1...'))
            readline.clearLine(process.stderr, 1);
            ffmpeg( stream )
            .noVideo()
            // .save(`${__dirname}/${finalUrl11[0]}.mp3`)
            .save(`${__dirname}/${name1}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('progress', p => {
                readline.cursorTo(process.stderr, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                readline.moveCursor(0,0);
                console.log(colors.green(`\n${name1}.mp3 done! - ${(Date.now() - start1) / 1000}s`));

                ConvertUrl2()
            });
    }
    const ConvertUrl2 = () => {

        let url2 = req.query.urlTWO;
        if (url2 === ''){
            ConvertUrl3()
            return
        }
        let finalUrl2 = url2.split('=')
        let finalUrl22 = finalUrl2[1].split('&')
        console.log('\n' + url2 + ' becomes ' + finalUrl22[0])
    
        let name2 = req.query.filename2
        if( req.query.filename2===''){
            name2 = 'MP3_Number_2'
        }
        name2 = name2.split(" ").join("_")
    
        let stream2 = ytdl(finalUrl22[0], {
            quality: 'highestaudio',
        });

        ytdl.getInfo(req.query.urlTWO).then(info => {
            let tempString = info.videoDetails.title
            console.log(colors.yellow(tempString))
        })
        console.log(colors.yellow('\nStarting no 2...'))

        let start2 = Date.now(); 

        readline.clearLine(process.stderr, 1);
        ffmpeg( stream2 )
            .noVideo()
            // .save(`${__dirname}/${finalUrl22[0]}.mp3`)
            .save(`${__dirname}/${name2}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('progress', p => {
                readline.cursorTo(process.stderr, 1);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(colors.green(`\n${name2}.mp3 done! - ${(Date.now() - start2) / 1000}s`));

                ConvertUrl3()
            });
    }
    const ConvertUrl3 = () => {

        let url3 = req.query.urlTHREE;
        if (url3 === ''){
            return
        }
        let finalUrl3 = url3.split('=')
        let finalUrl33 = finalUrl3[1].split('&')
        console.log('\n' + url3 + ' becomes ' + finalUrl33[0])
    
        let name3 = req.query.filename3
        if( req.query.filename2===''){
            name3 = 'MP3_Number_3'
        }
        name3 = name3.split(" ").join("_")
    
        let stream3 = ytdl(finalUrl33[0], {
            quality: 'highestaudio',
        });
    
        ytdl.getInfo(req.query.urlTHREE).then(info => {
            let tempString = info.videoDetails.title
            console.log(colors.yellow(tempString))
        })
        console.log(colors.yellow('\nStarting no 3...'))

        let start3 = Date.now(); 
        
        ffmpeg( stream3 )
            .noVideo()
            // .save(`${__dirname}/${finalUrl22[0]}.mp3`)
            .save(`${__dirname}/${name3}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('progress', p => {
                readline.cursorTo(process.stderr, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(colors.green(`\n${name3}.mp3 done! - ${(Date.now() - start3) / 1000}s`));
            });
    }

    ConvertUrl1()
})

module.exports = router
