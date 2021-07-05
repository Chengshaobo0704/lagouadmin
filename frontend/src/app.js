import router from './routes/index'

import './assets/common.css'


// $.ajax({
//     url: '/api/users/isAuto',
//     dataType: 'json',
//     success(result) {
//         if (result.ret) {
//             router.go('/index')
//         } else {
//             router.go('/login')
//         }
//     }
// })
router.go('/index')