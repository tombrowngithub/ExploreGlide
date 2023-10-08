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

app.get('/category/travel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'travel.html'))
})
app.get('/category/hotels', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'hotels.html'))
})

app.get('/category/education', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'education.html'))
})

app.get('/category/lifestyle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'lifestyle.html'))
})

app.get('/category/tours', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'tours.html'))
})
app.get('/category/adventure', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'adventure.html'))
})

app.get('/category/flight', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'category', 'flight.html'))
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