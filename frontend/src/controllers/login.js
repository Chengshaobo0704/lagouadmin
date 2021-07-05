import loginTpl from '../views/login.art'
const htmlLogin = loginTpl({})

const _handSubmit = (router) => {
    return (e) => {
        e.preventDefault()
        const data = $('#login').serialize()

        $.ajax({
            url: '/api/users/signin',
            dataType: 'json',
            type: 'post',
            data,
            success: function(result) {
                if (result.ret) {
                    router.go('/index')
                } else {
                    console.log('用户名不存在');
                }
            }
        })

    }
}

const login = (router) => {
    return (req, res, next) => {
        res.render(htmlLogin)

        $('#login').on('submit', _handSubmit(router))
    }
}

export default login