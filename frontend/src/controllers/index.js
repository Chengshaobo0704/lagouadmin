import indexTpl from '../views/index.art'

import signinTpl from '../views/signin.art'
import userlistTpl from '../views/userlist.art'
import userPagination from '../components/pagination'
import page from '../databus/page'

import { remove } from '../components/common/remove'


const htmlIndex = indexTpl({})


//当前页码



//初始化数据
let dataList = []
const _loadData = function() {
    return $.ajax({
        url: '/api/users',
        async: false,
        success(result) {
            dataList = result.data
            userPagination(dataList, page.pageSize, page.pageCount)
            _list(1)
        }
    })

}



//显示哪一页
const _list = (pageNo) => {

    let start = (pageNo - 1) * page.pageSize
    $('#user-list').html(userlistTpl({
        data: dataList.slice(start, start + page.pageSize)
    }))
}





const _signup = () => {
    const $userClose = $('#user-close')
    const data = $('#user-form').serialize()
    $.ajax({
        url: "/api/users",
        type: "post",
        data,
        success(res) {
            // console.log(res);

            _loadData()

        }
    })
    $userClose.click()
}



const _methods = () => {
    // 删除
    // $('#user-list').on('click', '.remove', function() {
    //         $.ajax({
    //             url: '/api/users',
    //             type: 'delete',
    //             data: {
    //                 id: $(this).data('id')
    //             },
    //             success() {
    //                 _loadData()
    //                 if (Math.ceil(dataList.length / page.pageSize) == page.pageCount && dataList.length !== page.pageCount * page.pageSize) {
    //                     page.setCurPage(page.setCurPage)
    //                 } else {
    //                     page.setCurPage(page.setCurPage - 1)
    //                 }

    //             }
    //         })



    //     })
    remove({
        $box: $('#user-list'),
        url: '/api/users',
        dataList: dataList,
        loadData: _loadData
    })


    $("#user-signout").on('click', (e) => {
        e.preventDefault();
        $.ajax({
            url: '/api/users/signout',
            dataType: 'json',
            success(result) {
                if (result.ret) {
                    location.reload()
                }
            }
        })
    })


    $('#user-save').on('click', _signup)
}

const _subscribe = () => {
    $('body').on('changeCurPage', (e, index) => {
        _list(index)
    })
}


const index = (router) => {
    const loadIndex = (res) => {
        res.render(htmlIndex);
        $(window, 'wrapper').resize()

        $('#content').html(signinTpl())
            //初次渲染
        _loadData()
        _methods()
        _subscribe()
    }
    return (req, res, next) => {
        $.ajax({
            url: '/api/users/isAuto',
            dataType: 'json',
            async: false,
            success(result) {
                if (result.ret) {
                    loadIndex(res)
                } else {
                    router.go('/login')
                }
            }
        })
    }


}






export default index