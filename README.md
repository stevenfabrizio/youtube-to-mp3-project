
# Why I Made This

I made this app because I am sick of using YouTube MP3 converters that can only do one file at a time(all of them). Here you can do five at a time and search five more while those are converting. The previous session searches are preserved with local storage.


# How To Run This App

1. Clone https://github.com/stevenfabrizio/youtube-to-mp3-project, install [node](https://nodejs.org/en/ "node"), install [ffmpeg](https://ffmpeg.org/download.html "ffmpeg") (with PATHs being added if necessary)
2. ``` cd server ``` (once inside the cloned directory)
3. ``` npm install ```
4. ``` npm run nodemon ```
5. Open http://localhost:8000/
6. Copy and paste YouTube links into the app
7. Add a name to your file if you like. Defaults to the YouTube title if not entered
8. Check ``` server/converted_files ``` folder for MP3s


# How It Works

It is an express server that on route '/download' will take the URL passed from the client and turn it into a stream with ytdl-core. Then ffmpeg will take the audio portion of the stream and save it as an MP3. The file is named 'Temp_File#' if no title is entered. When ffmpeg is done saving that file, it will rename 'Temp_File#' to the YouTube title stripped of characters that can't be used in file names.


# Future Improvements

As I learn more about express I wonder if it matters if using a post or get method matters for an app like this. Having a user enter a URL seems innocuous enough. And there are no databases or passwords involved here. So I will leave it with get requests for now.

It would be cool to host this online but figuring out how to set up ffmpeg and ytdl on something like Heroku is probably not worth the effort. I'm worried the download speeds would be really slow too.


---


![HTML Page](https://cdn.discordapp.com/attachments/840740146176851979/967203450318377080/unknown.png)

![Terminal](https://cdn.discordapp.com/attachments/840740146176851979/967229392868753448/unknown.png)


---


Background image is from this figma community file but I edited it a bit:
https://www.figma.com/community/file/1042176651593835021
