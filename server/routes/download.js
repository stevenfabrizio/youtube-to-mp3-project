const express = require('express')
const router = express.Router()

const colors = require('colors')
const readline = require('readline');

const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

// const path = require("path");
const fs = require('fs');

router.get('/', (req, res) => { 
    console.log(colors.yellow('\n\nConvert request accepted...'))

    //these variables are defined here else we get undefined error in ConvertUrl function
    let a = req.query.yturl1
    let b = req.query.filenameno1
    let c = '1'

    const ConvertUrl = (urlUNI, filenameUNI, whichfile) => {
        //getting sent entered URL and which number it is 
        let filenumber = whichfile
        let url1 = urlUNI;

        //if there is no URL entered, skip to try the next one.
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

        //splitting at the first = and the following &. 
        //this is the video ID.
        let finalUrl1 = url1.split('=')
        let finalUrl11 = finalUrl1[1].split('&')

        //getting the video ID from the url
        let name1 = StripTitleOfChars(filenameUNI)

        //if user did not enter a name, use temp_name#
        if (filenameUNI===''){
            name1 = 'temp_name' + filenumber.toString()
        }

        //lets get the highest quality audio from the URL
        let stream = ytdl(finalUrl11[0], {
            quality: 'highestaudio',
        });

        //telling terminal what the title of the detected video is
        ytdl.getInfo(urlUNI).then(info => {
            let tempString = info.videoDetails.title
            console.log(colors.yellow(`\nStarting to convert File #${filenumber}: ${tempString}`))
        }) 

        //starting date so can show user how long conversion took at the end
        let start1 = Date.now(); 

        //finally we get to ffmpeg. this will give us the MP3
        ffmpeg( stream )
        .noVideo()
        .save(`./converted_files/${name1}.mp3`)
        .on('error', (err) => {
            console.log('An error occurred: ' + err.message);
        }) 
        .on('progress', p => {  
            //for some reason this will only work on URL#1. i need to study piping and streams.
            readline.cursorTo(process.stderr, 0);
            process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('end', () => {
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

            //calling the next URL to be checked
            if(filenumber==='4'){RunNoFive()}
            if(filenumber==='3'){RunNoFour()}
            if(filenumber==='2'){RunNoThree()}
            if(filenumber==='1'){RunNoTwo()}
        });

    }

    //this could get called twice. gets bad filename chars out of title.
    const StripTitleOfChars = (name1) => {
        let strippedName = name1
        strippedName = strippedName.split(" ").join("_")
        strippedName = strippedName.split("%").join("_")
        strippedName = strippedName.split("*").join("_")
        strippedName = strippedName.split("<").join("_")
        strippedName = strippedName.split(">").join("_")
        strippedName = strippedName.split("?").join("")
        strippedName = strippedName.split("{").join("_")
        strippedName = strippedName.split("}").join("_")
        strippedName = strippedName.split("&").join("_")
        strippedName = strippedName.split("#").join("no")
        strippedName = strippedName.split("\\").join("_")
        strippedName = strippedName.split("/").join("_")
        strippedName = strippedName.split("$").join("_")
        strippedName = strippedName.split("!").join("_")
        strippedName = strippedName.split("+").join("_")
        strippedName = strippedName.split("|").join("_")
        strippedName = strippedName.split(":").join("_")
        strippedName = strippedName.split("=").join("_")
        strippedName = strippedName.split("@").join("_")
        strippedName = strippedName.split("'").join("_")
        strippedName = strippedName.split("\"").join("_")
        strippedName = strippedName.split("`").join("_")
        strippedName = strippedName.split(".").join("_")

        return strippedName
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
