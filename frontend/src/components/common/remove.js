import page from '../../databus/page'

export const remove = ({
    $box,
    url,
    dataList,
    loadData
}) => {
    $box.off('click').on('click', '.remove', function() {
        $.ajax({
            url: url,
            type: 'delete',
            data: {
                id: $(this).data('id')
            },
            success() {
                loadData()
                if (Math.ceil(dataList.length / page.pageSize) == page.pageCount && dataList.length !== page.pageCount * page.pageSize) {
                    page.setCurPage(page.setCurPage)
                } else {
                    page.setCurPage(page.setCurPage - 1)
                }

            }
        })



    })
}