const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog_app')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

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

app.post('/posts', (req, res) => {
  const { post } = req.body

  Post.create(Object.assign(post, { created: new Date() }), (error, post) => {
    if (error) {
      return console.log(`Error: ${error} at add new post`)
    }

    res.redirect('/posts')
  })
})

app.put('/posts/:id', (req, res) => {
  const { id } = req.params
  const { post } = req.body

  Post.findByIdAndUpdate(id, post, (error, postEdited) => {
    if (error) {
      return console.log(`Error: ${error} to get the post`)
    }

    res.redirect(`/posts/${id}`)
  })
})

app.get('/posts/:id/edit', (req, res) => {
  const { id } = req.params

  Post.findById(id, (error, post) => {
    if (error) {
      return console.log(`Error: ${error} to get the post`)
    }

    res.render('edit', { post })
  })
})

app.get('/posts/:id', (req, res) => {
  const { id } = req.params

  Post.findById(id, (error, post) => {
    if (error) {
      return console.log(`Error: ${error} to get the post`)
    }

    res.render('show', { post })
  })
})

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params

  Post.findByIdAndRemove(id, (error, post) => {
    if (error) {
      return console.log(`Error: ${error} to delete the post`)
    }

    res.redirect('/posts')
  })
})

app.listen(8080, () => {
  console.log('the server is running');
})
