const auto = (req, res, next) => {
    if (req.session.username) {
        next()
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录'
            })
        })
    }
}

exports.auto = auto