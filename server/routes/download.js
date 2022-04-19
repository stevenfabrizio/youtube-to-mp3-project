const express = require('express')
const router = express.Router()

const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const { resolve } = require('path');
ffmpeg.setFfmpegPath(ffmpegPath);


router.get('/', (req, res) => { 

    const ConvertUrl1 = () => {
        return new Promise((resolve, reject) => {

            let url1 = req.query.urlONE;
            if (url1 === ''){
                return
            }
            let finalUrl1 = url1.split('=')
            let finalUrl11 = finalUrl1[1].split('&')
            console.log(url1 + ' becomes ' + finalUrl11[0])

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
                console.log(tempString)
            })

            console.log('Starting no 1...')

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
                console.log(`\nNo 1 Done! - ${(Date.now() - start1) / 1000}s`);

                resolve(1)
            });
        })
    }

    const ConvertUrl2 = async () => {
        const result = await ConvertUrl1()  
        result

        let url2 = req.query.urlTWO;
        if (url2 === ''){
            return
        }
        let finalUrl2 = url2.split('=')
        let finalUrl22 = finalUrl2[1].split('&')
        console.log(url2 + ' becomes ' + finalUrl22[0])
    
        let name2 = req.query.filename2
        if( req.query.filename2===''){
            name2 = 'MP3_Number_2'
        }
        name2 = name2.split(" ").join("_")
    
        let stream2 = ytdl(finalUrl22[0], {
            quality: 'highestaudio',
        });
    
        let start2 = Date.now(); 

        console.log('Starting no 2...')

        readline.clearLine(process.stderr, 1); 
        
        ffmpeg( stream2 )
            .noVideo()
            // .save(`${__dirname}/${finalUrl22[0]}.mp3`)
            .save(`${__dirname}/${name2}.mp3`)
            .on('error', function(err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('progress', p => {
                readline.cursorTo(process.stderr, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                console.log(`\nNo 2 Done! - ${(Date.now() - start2) / 1000}s`);

                resolve()
            });
    }


    const ConvertUrl3 = async () => {
        const result = await ConvertUrl2()  
        result

        let url3 = req.query.urlTHREE;
        if (url3 === ''){
            return
        }
        let finalUrl3 = url3.split('=')
        let finalUrl33 = finalUrl3[1].split('&')
        console.log(url3 + ' becomes ' + finalUrl33[0])
    
        let name3 = req.query.filename3
        if( req.query.filename2===''){
            name3 = 'MP3_Number_3'
        }
        name3 = name3.split(" ").join("_")
    
        let stream3 = ytdl(finalUrl33[0], {
            quality: 'highestaudio',
        });
    
        let start3 = Date.now(); 

        console.log('Starting no 3...')

        readline.clearLine(process.stderr, 1); 
        
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
                console.log(`\nNo 3 Done! - ${(Date.now() - start3) / 1000}s`);
            });
    }
    ConvertUrl3()
})

module.exports = router
