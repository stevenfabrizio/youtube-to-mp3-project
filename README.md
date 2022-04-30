# youtube-to-mp3-project

I made this app because I am sick of converters that only do one file at a time. Here you can do five at a time and search five more while those are converting.


---


How to run this app:

1. Clone https://github.com/stevenfabrizio/youtube-to-mp3-project, install [node](https://nodejs.org/en/ "node"), install [ffmpeg](https://ffmpeg.org/download.html "ffmpeg") (with PATHs being added if necessary)
2. ``` cd server ```
3. ```npm install ```
4. ```npm run nodemon ```
5. Go to http://localhost:8000/
6. Copy and paste youtube links into the app
7. Add a name to your file if you like. Defaults to YT title if not entered
8. Check ``` server/converted_files ``` folder for MP3s


---


How it works:

It is an express server that on route '/download' will take the URL passed from the client and turn it into a stream with ytdl-core. Then ffmpeg will take the audio portion of the stream and save it as an MP3. The file is named 'Temp_File#' if no title is entered. When ffmpeg is done saving that file, it will rename 'Temp_File#' to the YouTube title stripped of characters that can't be used in file names.


---


![HTML Page](https://cdn.discordapp.com/attachments/840740146176851979/967203450318377080/unknown.png)

![Terminal](https://cdn.discordapp.com/attachments/840740146176851979/967229392868753448/unknown.png)


---


Background image is from this figma community file but I edited it a bit:
https://www.figma.com/community/file/1042176651593835021
