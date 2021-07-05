class page {
    constructor() {
        this.pageSize = 3
        this.curPage = 1
        this.pageCount
    }
    setCurPage(curPage) {
        this.curPage = curPage

    }
    setPageCount(pageCount) {
        this.pageCount = pageCount
    }
}

export default new page()