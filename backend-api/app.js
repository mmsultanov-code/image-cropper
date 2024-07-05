const express = require('express');
const path = require('path');
var cors = require('cors')
const imageRouter = require('./routes/image');

const app = express();
app.use(cors())

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', imageRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});