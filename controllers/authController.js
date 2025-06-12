const loginForm = require('../helpers/loginForm')
const baseHtml = require('../helpers/baseHtml')

exports.showLogin = (req, res) => {
  const body = loginForm()
  const html = baseHtml(body)
  res.send(html)
};

exports.login = (req, res) => {
  const { username, password } = req.body

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    req.session.authenticated = true
    return res.redirect('/dashboard')
  }

  return res.redirect('/login')
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
}