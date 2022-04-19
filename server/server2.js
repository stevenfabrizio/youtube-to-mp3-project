const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const readline = require('readline');
const ytdl = require('ytdl-core');

let id = 'AyLQGDIrGcI';

let stream = ytdl(id, {
  quality: 'highestaudio',
});

let start = Date.now();

ffmpeg( stream )
    .noVideo()
    .save(`${__dirname}/${id}.mp3`)
    .on('progress', p => {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
      console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
    });