const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://localhost/blog_app')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)

app.get('/', (req, res) => {
  res.redirect('/posts')
})

app.get('/posts', (req, res) => {
  console.log('index')
})

app.get('/posts/new', (req, res) => {
  res.render('new')
})

app.get('/posts/edit', (req, res) => {
  res.render('edit')
})

app.post('/posts', (req, res) => {
  const { title, image, body } = req.body

  Post.create({ title, image, body, created: new Date() }, (error, post) => {
    if (error) {
      return console.log(`Error: ${error} at add new post`)
    }

    console.log(`added the post: ${post}`)

    res.redirect('/posts')
  })
})

app.listen(8080, () => {
  console.log('the server is running');
})
