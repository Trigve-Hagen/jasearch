let SearchOrder = (function (SearchHelpers) {
    let order = {}

    /**
     * Public property
     * An array of search or filter objects. searchOrder keeps the order of
     * the filters so the results are narrowed down as the filters
     * are added and expanded as the filters are removed relative to the
     * search. This is not a list of results. This is the order in which the
     * search and/or filters are selected.
     *
     * {
     *  "id": "filterName-value"
     *  "type": "select, checkbox, radio, button or search"
     * }
     */
    order.searchOrder = []

    /**
     * Public property
     * The filters that can only be in searchOrder once.
     */
    order.onlyOnce = ["select", "radio", "search"]

    /**
     * Public function
     * Add a search or filter to searchOrder.
     * 
     * if another filter that can only be added once is in searchOrder it is first erased.
     * Then the new filter is added.
     *
     * @param string item
     *   The name of the filter or search.
     */
    order.addItem = function (item) {
        order.searchOrder.push(item)
    }

    /**
     * Public function
     * Removes extra elements of filters that can only have one item selected.
     *
     * @param string item
     *   The name of the filter or search.
     */
    order.removeOnlyOnceItems = function (item) {
        // console.log(JSON.stringify(item))
        order.onlyOnce.forEach(function (elem) {
            // console.log(item.type + " - " + elem + " & " + item.id.split("-")[0] + " - " + filterName)
            if (item.type == elem) {
                // console.log(item.type + " - " + elem)
                order.searchOrder.forEach(function (orderItem) {
                    // console.log(orderItem.type + " - " + item.type + " & " + SearchHelpers.getFilterName(orderItem.id) + " - " + SearchHelpers.getFilterName(item.id))
                    if (orderItem.type == item.type && SearchHelpers.getFilterName(orderItem.id) == SearchHelpers.getFilterName(item.id) && SearchHelpers.getFilterOption(orderItem.id) != SearchHelpers.getFilterOption(item.id)) {
                        console.log(JSON.stringify(orderItem))
                        order.removeItem(orderItem)
                    }
                })
            }
        })
    }

    /**
     * Public function
     * Removes the search or filter from searchOrder.
     *
     * @param string itme
     *   The name of the filter or search.
     */
    order.removeItem = function (filter) {
        let sOrder = order.searchOrder
        order.searchOrder = []
        sOrder.forEach(function (item) {
            for (let key in filter) {
                if (key == "id") {
                    // console.log(item[key].toString() + " - " + filter[key].toString())
                    if (item[key].toString() != filter[key].toString())
                        order.searchOrder.push(item)
                }
            }
        });
    }

    /**
     * Public function
     * Remove the search in searchOrder.
     */
    order.removeSearch = function () {
        let sOrder = order.searchOrder
        order.searchOrder = []
        sOrder.forEach(function (item) {
            if (item["type"].toString() != "search")
                order.searchOrder.push(item)
        });
    }

    /**
     * Public function
     * Emptys searchOrder.
     */
    order.emptyOrder = function () {
        order.searchOrder = []
    }

    /**
     * Public function
     * Searches onlyOnce array for a value.
     *
     * @param string element
     *   The name of the element to look for.
     */
    order.existsInOnlyOnce = function (element) {
        return order.onlyOnce.includes(element)
    }

    return order;
}(SearchHelpers));