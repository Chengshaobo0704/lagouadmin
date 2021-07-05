import pagelistTpl from '../views/pagelist.art'
import page from '../databus/page'



//显示高亮
const _highLight = (index) => {
        $('#page-list #user-page-list li:not(:first-child,:last-child)')
            .eq(index - 1)
            .addClass('active')
            .siblings()
            .removeClass('active')
    }
    //分页

const userPagination = function(data, pageSize, pageCount) {

    const totalPage = data.length
    pageCount = Math.ceil(totalPage / pageSize)
    page.setPageCount(pageCount)
    const pageArray = new Array(pageCount)
    const htmlPage = pagelistTpl({
        pageArray
    })
    $('#page-list').html(htmlPage)

    $('#user-page-list li:not(:first-child,:last-child)').on('click', function() {
        //添加class,同时抹去兄弟节点的class
        const index = $(this).index()
        page.setCurPage(index)
        $('body').trigger('changeCurPage', index)
        _highLight(index)

    })
    $('#page-list').on('click', '#user-page-list li:first-child', function() {

        if (page.curPage > 1) {
            page.setCurPage(page.curPage - 1)
            $('body').trigger('changeCurPage', page.curPage)
            _highLight(page.curPage)
        }

    })

    $('#page-list').on('click', '#user-page-list li:last-child', function() {
        if (page.curPage < page.pageCount) {
            page.setCurPage(page.curPage + 1)
            $('body').trigger('changeCurPage', page.curPage)
            _highLight(page.curPage)
        }

    })
}

export default userPagination