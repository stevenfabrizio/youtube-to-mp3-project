const express = require('express')
const router = express.Router()

const colors = require('colors')
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

// const { resolve } = require('path');
const path = require("path");
const fs = require('fs');

router.get('/', (req, res) => { 
    console.log(colors.yellow('\n\nConvert request accepted...'))
    //these variables are defined here else we get undefined error in main function
    let a = req.query.yturl1
    let b = req.query.filenameno1
    let c = '1'

    const ConvertUrl = (urlUNI, filenameUNI, whichfile) => { 
        let filenumber = whichfile
        let url1 = urlUNI;
        if (url1 === ''){
            console.log(`\nNo URL detected in #${filenumber}, skipping...`)
            if(filenumber==='5'){
                console.log('All Done!\n')
                return
            }
            if(filenumber==='4'){RunNoFive()}
            if(filenumber==='3'){RunNoFour()}
            if(filenumber==='2'){RunNoThree()}
            if(filenumber==='1'){RunNoTwo()}

            return
        } 

        let finalUrl1 = url1.split('=')
        let finalUrl11 = finalUrl1[1].split('&')
        // console.log('\n' + url1 + ' becomes ' + finalUrl11[0])

        let name1 = StripTitleOfChars(filenameUNI)
        if (filenameUNI===''){
            name1 = 'temp_name' + filenumber.toString()
        }

        let stream = ytdl(finalUrl11[0], {
            quality: 'highestaudio',
        });

        ytdl.getInfo(urlUNI).then(info => {
            let tempString = info.videoDetails.title
            console.log(colors.yellow(`\nStarting to convert File #${filenumber}: ${tempString}`))
        }) 


        let start1 = Date.now(); 
        ffmpeg( stream )
        .noVideo()
        .save(`./converted_files/${name1}.mp3`)
        .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        }) 
        .on('progress', p => {
            readline.cursorTo(process.stderr, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('end', () => {
            // readline.close
            //renaming the file to youtube title if user did not enter one.
            if(name1 === 'temp_name' + filenumber){
                ytdl.getInfo(urlUNI).then(info => {
                    let fileName = `./converted_files/temp_name${filenumber}.mp3`;
                    
                    let newFileName = StripTitleOfChars(info.videoDetails.title)

                    fs.rename(fileName, `./converted_files/${newFileName}.mp3`, function(err){
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                });
            }
            
            console.log(colors.green(`File #${filenumber} done! - ${(Date.now() - start1) / 1000}s`));

            if(filenumber==='5'){
                console.log('All Done!')
                return
            }
            if(filenumber==='4'){RunNoFive()}
            if(filenumber==='3'){RunNoFour()}
            if(filenumber==='2'){RunNoThree()}
            if(filenumber==='1'){RunNoTwo()}
        });

    }

    //this could get called twice. gets bad filename chars out of title.
    const StripTitleOfChars = (name1) => {
        let name11 = name1
        name11 = name11.split(" ").join("_")
        name11 = name11.split("%").join("_")
        name11 = name11.split("*").join("_")
        name11 = name11.split("<").join("_")
        name11 = name11.split(">").join("_")
        name11 = name11.split("?").join("")
        name11 = name11.split("{").join("_")
        name11 = name11.split("}").join("_")
        name11 = name11.split("&").join("_")
        name11 = name11.split("#").join("no")
        name11 = name11.split("\\").join("_")
        name11 = name11.split("/").join("_")
        name11 = name11.split("$").join("_")
        name11 = name11.split("!").join("_")
        name11 = name11.split("+").join("_")
        name11 = name11.split("|").join("_")
        name11 = name11.split(":").join("_")
        name11 = name11.split("=").join("_")
        name11 = name11.split("@").join("_")
        name11 = name11.split("'").join("_")
        name11 = name11.split("\"").join("_")
        name11 = name11.split("`").join("_")
        name11 = name11.split(".").join("_")

        return name11
    }        

    //run function #1 first, then call the next at the end of each one.
    const RunNoTwo = () => {
        ConvertUrl(req.query.yturl2, req.query.filenameno2, '2')
    }
    const RunNoThree = () => {
        ConvertUrl(req.query.yturl3, req.query.filenameno3, '3')
    }
    const RunNoFour = () => {
        ConvertUrl(req.query.yturl4, req.query.filenameno4, '4')
    }
    const RunNoFive = () => {
        ConvertUrl(req.query.yturl5, req.query.filenameno5, '5')
    }
    ConvertUrl(a, b, c)
})

module.exports = router
