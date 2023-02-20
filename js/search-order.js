let SearchOrder = (function (SearchHelpers) {
    let que = {}

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
        let ifExists = false
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
        que.searchQue.push(item)
    }

    /**
     * Public function
     * Removes extra elemens from filters that can only have one item selected.
     *
     * @param string item
     *   The name of the facet or search.
     */
    que.removeOnlyOnceItems = function (item) {
        // console.log(JSON.stringify(item))
        que.onlyOnce.forEach(function (elem) {
            // console.log(item.type + " - " + elem + " & " + item.id.split("-")[0] + " - " + filterName)
            if (item.type == elem) {
                // console.log(item.type + " - " + elem)
                que.searchQue.forEach(function (queItem) {
                    // console.log(queItem.type + " - " + item.type + " & " + SearchHelpers.getFilterName(queItem.id) + " - " + SearchHelpers.getFilterName(item.id))
                    if (queItem.type == item.type && SearchHelpers.getFilterName(queItem.id) == SearchHelpers.getFilterName(item.id) && SearchHelpers.getFilterOption(queItem.id) != SearchHelpers.getFilterOption(item.id)) {
                        console.log(JSON.stringify(queItem))
                        que.removeItem(queItem)
                    }
                })
            }
        })
    }

    /**
     * Public function
     * Remove search or facet to que.
     *
     * @param string itme
     *   The name of the facet or search.
     */
    que.removeItem = function (filters) {
        // console.log(queItem.id + " - " + item.id)
        /* if (que.searchQue.length == 1) {
            que.searchQue = []
        } else { */
        // let newArray = []
        que.searchQue = que.searchQue.filter(function (item) {
            for (let key in filters) {
                // console.log(item[key] + " - " + filters[key])
                if (item[key] === undefined || item[key].toString() == filters[key].toString())
                    return false
            }
            return true
        });
        // console.log(JSON.stringify(que.searchQue))
        // que.searchQue = que.searchQue.filter(queItem => queItem.id != item.id)
        // }
    }

    /**
     * Public function
     * Emptys the que.
     */
    que.emptyQue = function () {
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
        return que.onlyOnce.includes(element)
    }

    return que;
}(SearchHelpers));