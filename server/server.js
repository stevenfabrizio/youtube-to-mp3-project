const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const downloadRouter = require('./routes/download');
app.use('/download', downloadRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`We are running at http://localhost:${port}`);
});
