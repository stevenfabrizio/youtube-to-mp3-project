const express = require('express')
const router = express.Router()

const fs = require('fs');
const colors = require('colors')
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
// const path = require("path");
// const readline = require('readline');

ffmpeg.setFfmpegPath(ffmpegPath);

router.get('/', (req, res) => { 
    console.log(colors.yellow('\n\nConvert request accepted...'))

    //these variables are defined here else get undefined error in ConvertUrl(). start with vid #1.
    const a = req.query.yturl1
    const b = req.query.filenameno1
    const c = '1'

    const ConvertUrl = (urlUNI, filenameUNI, whichfile) => {
        //getting the data from form action get method
        const rawUrl = urlUNI;
        const userEnteredTitle = filenameUNI
        const fileNumber = whichfile

        //if there is no URL entered, skip to try the next one. we are done after #5.
        if (rawUrl === ''){
            console.log(`\nNo URL detected in #${fileNumber}, skipping...`)
            if(fileNumber==='5'){
                console.log('All Converions Complete!\n')
                return
            }
            if(fileNumber==='4'){RunNoFive()}
            if(fileNumber==='3'){RunNoFour()}
            if(fileNumber==='2'){RunNoThree()}
            if(fileNumber==='1'){RunNoTwo()}

            return
        } 

        //getting video ID by splitting at the first = and the following &.
        const userUrlNoEqual = rawUrl.split('=')
        const urlID = userUrlNoEqual[1].split('&')

        //getting rid of bad chars in video title to safely save the file later.
        let temporaryFileName = StripTitleOfChars(userEnteredTitle)

        //if user did not enter a name, name the file 'temp_name#'
        if (userEnteredTitle===''){
            temporaryFileName = 'temp_name' + fileNumber
        }

        //lets get the highest quality audio from the URL
        const stream = ytdl(urlID[0], {
            quality: 'highestaudio',
        });

        //terminal telling us what the title of our detected video is
        ytdl.getInfo(rawUrl).then(info => {
            const videoTitle = info.videoDetails.title
            console.log(colors.yellow(`\nStarting to convert File #${fileNumber}: ${videoTitle}`))
        }) 

        //starting date so can show user how long conversion took at the end
        const currentDate = Date.now(); 

        //finally we get to ffmpeg magic. this will give us the MP3
        ffmpeg( stream )
        .noVideo()
        .save(`./converted_files/${temporaryFileName}.mp3`)
        .on('error', (err) => {
            console.log('An error occurred: ' + err.message);
        }) 
        // .on('progress', p => {  
        //     for some reason this will only work on URL#1. i need to study piping and streams.
        //     readline.cursorTo(process.stderr, 0);
        //     process.stdout.write(`${p.targetSize}kb downloaded`);
        // })
        .on('end', () => {
            //renaming the file to youtube's title if user did not enter one.
            if(temporaryFileName === 'temp_name' + fileNumber){
                ytdl.getInfo(rawUrl).then(info => {
                    const oldFileName = `./converted_files/temp_name${fileNumber}.mp3`;
                    const newFileName = StripTitleOfChars(info.videoDetails.title)

                    fs.rename(oldFileName, `./converted_files/${newFileName}.mp3`, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                });
            }
            
            console.log(colors.green(`File #${fileNumber} done! - It took ${(Date.now() - currentDate) / 1000} seconds.`));

            //calling the next video to be converted, if it is not #5.
            if(fileNumber==='5'){
                console.log('All Conversions Complete!')
                return
            }
            if(fileNumber==='4'){RunNoFive()}
            if(fileNumber==='3'){RunNoFour()}
            if(fileNumber==='2'){RunNoThree()}
            if(fileNumber==='1'){RunNoTwo()}
        });

    }

    //truncates bad chars for saving to system and general cleanliness
    const StripTitleOfChars = (temporaryFileName) => {
        let strippedName = temporaryFileName
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
