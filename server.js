//setting up our server
const express = require('express')
const app = express();
const path = require('path')

// Set up the static path from public
app.use(express.static(path.join(__dirname, 'public')))

//define route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'postBlog.html'))
})

app.get('/travel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'travel.html'))
})
app.get('/hotels', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hotels.html'))
})

app.get('/education', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'education.html'))
})

app.get('/lifestyle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lifestyle.html'))
})

app.get('/tours', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tours.html'))
})
app.get('/adventure', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'adventure.html'))
})

app.get('/flight', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flight.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'))
})
//The route to get our blog post based on the ID of clicked post
app.get("/:blog", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', "blog.html"));
})

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})