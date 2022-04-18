const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg({ source: './video.mp4'})
    .noVideo()
    .output('./audio.mp3')
    .run(); 