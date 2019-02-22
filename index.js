const bodyParser = require('body-parser');

const express = require('express');
const app = express();

// Body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// getting data
const posts = require('./posts');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Posts api');
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});