function authMiddleware(req,res,next) {
    if (req.session.authenticated) {
    return next()
    }
    return res.redirect('/login')
}
module.exports = authMiddleware