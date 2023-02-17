var SearchOrder = (function (SearchHelpers) {
    var que = {}

    /**
     * Public property
     * An array of search or facet objects. The que is to keep the order of
     * the filters so the results are narrowed down as the filters
     * are added and expanded as the filters are removed relative to the
     * search.
     *
     * {
     *  "id": "facetName-value"
     *  "type": "select, checkbox, radio, button or search"
     * }
     */
    que.searchQue = []

    /**
     * Public property
     * The filters that can only be in the que once.
     */
    que.onlyOnce = ["select", "radio", "search"]

    /**
     * Public function
     * Checks if search or facet exists in que.
     *
     * @param string item
     *   The name of the facet or search.
     * 
     * @return bool
     */
    que.ifExists = function (item) {
        var ifExists = false
        que.searchQue.forEach(function (elem) {
            if (item == elem.id) ifExists = true
        })
        return ifExists
    }

    /**
     * Public function
     * Add search or facet to que.
     * 
     * if another filter that can only be added once is in the que it is first erased.
     * Then the new filter is added.
     *
     * @param string item
     *   The name of the facet or search.
     */
    que.addItem = function (item) {
        que.onlyOnce.forEach(function (elem) {
            if (item.type === elem) {
                que.searchQue.forEach(function (queItem) {
                    if (queItem.type == item.type && SearchHelpers.getFilterName(queItem.id) == SearchHelpers.getFilterName(item.id)) que.removeItem(queItem)
                })
            }
        })
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

    /**
     * Public function
     * Searches onlyOnce array for a value.
     *
     * @param string element
     *   The name of the element to look for.
     */
    que.existsInOnlyOnce = function (element) {
        que.onlyOnce.includes(element)
    }

    return que;
}(SearchHelpers));