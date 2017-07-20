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
  Post.find((error, posts) => {
    if (error) {
      return console.log(`Error: ${error} at add new post`)
    }

    res.render('index', { posts })
  })
})

app.get('/posts/new', (req, res) => {
  res.render('new')
})

app.get('/posts/edit', (req, res) => {
  res.render('edit')
})

app.post('/posts', (req, res) => {
  const { post } = req.body

  Post.create(Object.assign(post, { created: new Date() }), (error, post) => {
    if (error) {
      return console.log(`Error: ${error} at add new post`)
    }

    res.redirect('/posts')
  })
})

app.get('/posts/:id', (req, res) => {
  const { id } = req.params

  Post.findById(id, (error, post) => {
    if (error) {
      return console.log(`Error: ${error} to get the post`)
    }
    console.log(post)
    res.render('show', { post })
  })
})

app.listen(8080, () => {
  console.log('the server is running');
})
