var SearchQue = (function () {
    var que = {}

    que.searchQue = []

    /**
     * Public function
     * Add search or facet to que.
     * 
     * Search or facet is added to the que. Each filters the list done more.
     *
     * @param string item
     *   The name of the facet or search.
     */
    que.addItem = function (item) {
        que.searchQue.push(item)
    }

    /**
     * Public function
     * Remove search or facet to que.
     *
     * @param string itme
     *   The name of the facet or search.
     */
    que.removeItem = function (item) {
        que.searchQue = que.searchQue.filter(queItem => queItem != item)
    }

    /**
     * Public function
     * Emptys the que.
     *
     * @param string id
     *   The id of the script that holds the templates.
     */
    que.emptyQue = function (id) {
        que.searchQue = []
    }

    return que;
}());