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

Post.create({
  title: 'Dogs',
  image: 'http://www.dogbazar.org/wp-content/uploads/2014/09/british-bull-dog-puppies.jpg',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.officia deserunt mollit anim id est laborum.'
})

app.get('/posts', (req, res) => {
  console.log('all')
})

app.get('/posts/new', (req, res) => {
  console.log('new')
})

app.get('/posts/edit', (req, res) => {
  console.log('edit')
})

app.listen(8080, () => {
  console.log('the server is running');
})
