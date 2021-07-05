import SMERouter from 'sme-router'

const router = new SMERouter('root')


import index from '../controllers/index'
import login from '../controllers/login'


router.use((req) => {
        $.ajax({
            url: '/api/users/isAuto',
            dataType: 'json',
            success(result) {
                if (result.ret) {
                    router.go('/index')
                } else {

                    router.go('/login')
                }
            }
        })
    })
    // route config


router.route('/index', index(router))
router.route('/login', login(router))
    // router.route('*', (req, res, next) => {
    //     res.redirect('/login')
    // })

export default router