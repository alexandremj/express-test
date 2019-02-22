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
});

// Show single post
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) res.status(404).send("The post with the given ID was not found");
    res.send(post);
});

// Create
app.post('api/posts', (req, res) => {
    const title, body = req.body;

    const post = {
        userId: 1,
        id: posts.length +1,
        title,
        body
    };

    // add post
    posts.push(post);

    // return post
    res.send(post);
});

// Update route
app.put('/api/posts/:id', (req, res) => {
    // Grab post
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    // Check if exists
    if (!post) res.status(404).send("The post with the given ID was not found.");

    // Update post
    post.title = req.body.title;
    post.body = req.body.body;

    // Return post
    res.send(post);
})

// Destroy 
app.delete('/api/posts/:id', (req, res) => {
    // Grab post
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    // Delete post
    const index = posts.indexOf(post);
    posts.splice(index, 1);

    // Return post
    res.send(post);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});