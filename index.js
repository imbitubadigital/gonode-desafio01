const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)

app.set('view engine', 'njk')

const isValid = (req, res, next) => {
  const {
    age
  } = req.query
  if (!age || isNaN(parseInt(age))) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  const url = req.body.age > 18 ? `/major?age=${req.body.age}` : `/minor?age=${req.body.age}`
  return res.redirect(url)
})
app.get('/major', isValid, (req, res) => {
  return res.render('major', {
    'age': req.query.age
  })
})

app.get('/minor', isValid, (req, res) => {
  return res.render('minor', {
    'age': req.query.age
  })
})

app.listen(3000)
