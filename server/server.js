const express = require('express')
const app = express()
const cors = require('cors')

const path = require('path'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.get('/', (req, res) => {
    // res.sendFile('./public/index.html', { root: './' }) 
    res.sendFile('index.html', { root: './' })
})


// const path = require("path");
// const fs = require('fs');

// let fileName = './routes/URLSYESBABY.txt';
// let newFileName = './routes/urls.txt';
// fs.rename(fileName, newFileName, function(err) {
//     if (err) {
//         console.log(err);
//     return;
//     }
// console.log("File renamed successfully");
// });



const downloadRouter = require('./routes/download')
app.use('/download', downloadRouter)

const port = 3000
app.listen(port, () => {
    console.log(`We are running on port ${port}`)
})