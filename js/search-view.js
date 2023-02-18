let SearchView = (function (SearchModel, SearchOrder, SearchHelpers) {
    let view = {}

    /**
     * Public property
     * An array of filtered search items.
     */
    view.filteredData = []

    /**
     * Private helper function
     * Creates checkbox, radio and select form elements.
     *
     * Creates filter form elements from the JSON data provided.
     *
     * @param string type
     *   The type of element to ceate. Checkbox, radio or select.
     * @param string template
     *   The template created in index.html.
     * @param object data
     *   An oject from JSON containing the filter data.
     * 
     * @return string template
     */
    function createFormElement(template, data) {
        let placeholder = "{{ element }}"
        let id = SearchHelpers.toCamelCase(data.name)
        let elementHtml = "<form>";
        if (data.type == 'select') {
            elementHtml += '<select name="' + id + '" id="' + id + '" class="' + data.elementClasses + '">';
            data.options.forEach(function (item) {
                elementHtml += '<option value="' + SearchHelpers.createId(item) + '" /> ' + item + '</option>';
            })
            elementHtml += '</select>';
        } else if (data.type == "button") {
            let prefix = data.prefix != "na" ? data.prefix : ""
            let suffix = data.suffix != "na" ? data.suffix : ""
            data.options.forEach(function (item) {
                let optionId = id + "-" + SearchHelpers.createId(item)
                elementHtml += prefix
                elementHtml += '<button type="button" id="' + optionId + '" class="' + data.elementClasses + '" /> ' + item + '</button>';
                elementHtml += suffix
            })
        } else {
            let prefix = data.prefix != "na" ? data.prefix : ""
            let suffix = data.suffix != "na" ? data.suffix : ""
            let labelClasses = data.labelClasses != "na" ? data.labelClasses : ""
            data.options.forEach(function (item) {
                let optionId = id + "-" + SearchHelpers.createId(item)
                elementHtml += prefix;
                elementHtml += '<input type="' + data.type + '" class="' + data.elementClasses + '" name="' + id + '" id="' + optionId + '" />'
                elementHtml += '<label class="' + labelClasses + '" for=' + optionId + '">' + item + '</label>';
                elementHtml += suffix
            })
        }
        elementHtml += "</form>";

        template = template.replace(placeholder, elementHtml)
        return template
    }

    /**
     * Private helper function
     * Fills in template placeholders by calling replace function.
     *
     * @param string template
     *   The template created in index.html.
     * @param object data
     *   An oject from JSON containing the filter data.
     * 
     * @return string template
     */
    function fillTemplate(template, data) {
        switch (data.type) {
            case 'select': template = createFormElement(template, data); break;
            case 'checkbox': template = createFormElement(template, data); break;
            case 'radio': template = createFormElement(template, data); break;
            case 'button': template = createFormElement(template, data); break;
        }
        Object.keys(data).forEach(function (key) {
            let placeholder = "{{ " + key + " }}"
            let value = data[key]

            while (template.indexOf(placeholder) !== -1) {
                template = template.replace(placeholder, value)
            }
        })
        return template
    }

    /**
     * Private helper function
     * Filter the search when a filter is selected.
     * Test all possibilities of none string conditions
     *
     * @param oject event
     *   The filter's event object
     * @param string filtersData
     *   A JSON array of filter objects.
     * @param object searchData
     *   A JSON array of result objects.
     */
    function filterElements(event) {
        SearchModel.filtersData.forEach(function (filterItem) {
            filterItem.options.forEach(function (option) {
                if (filterItem.type == "select") {
                    // console.log(option + " - " + event.target.value)
                    if (SearchHelpers.createId(option) == event.target.value) {
                        SearchModel.searchData.forEach(function (searchItem) {
                            let keys = Object.keys(searchItem);
                            keys.forEach(function (key) {
                                // console.log(SearchHelpers.createId(filterItem.name) + " - " + key)
                                if (SearchHelpers.createId(filterItem.name) == key && searchItem[SearchHelpers.createId(filterItem.name)] == event.target.value) {
                                    // view.filteredData.push(searchItem)
                                    let queId = SearchHelpers.createId(filterItem.name) + "-" + SearchHelpers.createId(option)
                                    if (!SearchOrder.ifExists(queId)) {
                                        SearchOrder.addItem({
                                            "id": queId,
                                            "type": filterItem.type
                                        })
                                    }
                                    view.filteredData = view.buildFilteredData()
                                }
                            })
                        })
                    }
                } else {
                    // console.log(SearchHelpers.createId(option) + " - " + SearchHelpers.getFilterOption(event.target.id))
                    if (SearchHelpers.createId(option) == SearchHelpers.getFilterOption(event.target.id)) {
                        SearchModel.searchData.forEach(function (searchItem) {
                            let keys = Object.keys(searchItem);
                            keys.forEach(function (key) {
                                // console.log(SearchHelpers.toCamelCase(filterItem.name) + " - " + key + " & " + searchItem[SearchHelpers.toCamelCase(filterItem.name)] + " - " + SearchHelpers.getFilterOption(event.target.id))
                                if (SearchHelpers.toCamelCase(filterItem.name) == key && searchItem[SearchHelpers.toCamelCase(filterItem.name)].toString() == SearchHelpers.getFilterOption(event.target.id)) {
                                    // console.log(filterItem.type)
                                    // view.filteredData.push(searchItem)
                                    let queId = SearchHelpers.toCamelCase(filterItem.name) + "-" + SearchHelpers.createId(option)
                                    if (!SearchOrder.ifExists(queId)) {
                                        SearchOrder.addItem({
                                            "id": queId,
                                            "type": filterItem.type
                                        })
                                    }
                                    // switchState(queId, filterItem)
                                    view.filteredData = view.buildFilteredData()
                                }
                            })
                        })
                    }
                }
            })
        })
        console.log(SearchOrder.searchQue)
        // display the filtered data
        view.displayList(view.fillList(
            view.getTemplate("resultsTemplate"),
            view.filteredData
        ), 'search-results')
    }

    function switchState(id, filter) {
        switch (filter.type) {
            case "button":
                let selectElm = document.getElementById(id)
                if (selectElm.className == filter.elementClasses) {
                    selectElm.className = filter.elementClassesActive
                } else {
                    selectElm.className = filter.elementClasses
                    if (SearchOrder.ifExists(id))
                        SearchOrder.removeItem({
                            "id": id,
                            "type": filter.type
                        })
                }
                break;
        }
    }

    /**
     * Public function
     * Creates search form submit event.
     *
     * @param JSON data
     *   JSON containing search results data.
     */
    view.createSearchEvent = function () {
        let searchBtn = document.getElementById("search-submit")
        let searchInput = document.getElementById("search-input")
        searchBtn.addEventListener('click', event => {
            event.preventDefault()
            console.log(searchInput.value)
        })
    }

    /**
     * Public function
     * Creates Facet checkbox, radio and select form element change events.
     *
     * @param JSON data
     *   JSON containing filter data.
     */
    view.createFacetEvents = function () {
        SearchModel.filtersData.forEach(function (element) {
            let id = SearchHelpers.toCamelCase(element.name)

            if (element.type == 'select') {
                let selectElm = document.getElementById(id)
                selectElm.addEventListener('change', event => {
                    filterElements(event)
                })
            } else if (element.type == "button") {
                element.options.forEach(function (item) {
                    let selectElm = document.getElementById(id + "-" + SearchHelpers.createId(item))
                    selectElm.addEventListener('click', event => {
                        filterElements(event)
                    })
                })
            } else {
                element.options.forEach(function (item) {
                    let selectElm = document.getElementById(id + "-" + SearchHelpers.createId(item))
                    selectElm.addEventListener('change', event => {
                        filterElements(event)
                    })
                })
            }
        })
        let resetElm = document.getElementById("reset-filters")
        resetElm.addEventListener('click', event => {
            console.log(event.target.id)
        })
    }

    /**
     * Public function
     * Fills in a list of templates using replace function.
     *
     * @param string template
     *   The template created in index.html.
     * @param JSON dataArray
     *   JSON containing search results or filter data.
     * 
     * @return string list of populated templates
     */
    view.fillList = function (template, dataArray) {
        let listString = ""
        dataArray.forEach(function (data) {
            listString += fillTemplate(template, data)
        })
        return listString
    }

    /**
     * Public function
     * Displays list of templates.
     *
     * @param string resultsList
     *   The list of templates to display.
     * @param string id
     *   The id of the div to display the templates in.
     */
    view.displayList = function (resultsList, id) {
        let results = document.getElementById(id)
        results.innerHTML = resultsList
    }

    /**
     * Public function
     * Gets the template html.
     * 
     * Templates are stored in a script tag with type type="text/template"
     * in index.html.
     *
     * @param string id
     *   The id of the script that holds the templates.
     */
    view.getTemplate = function (id) {
        let template = document.getElementById(id);
        return template.innerHTML;
    }

    /**
     * Public function
     * Builds the filteredData array from the searchOrderArray.
     *
     * @param string name
     *   The name of the filter.
     * 
     * @param string value
     *   The value we want to keep in the results
     */
    view.buildFilteredData = function () {
        let newArray = []
        let filters = {}
        // create a filter object
        SearchOrder.searchQue.forEach(function (queItem) {
            filters[SearchHelpers.getFilterName(queItem.id)] = SearchHelpers.getFilterOption(queItem.id)
        })

        newArray = SearchModel.searchData.filter(function (item) {
            for (let key in filters) {
                // console.log(item[key] + " - " + filters[key])
                if (item[key] === undefined || item[key].toString() != filters[key].toString())
                    return false
            }
            return true
        });

        return newArray
    }

    return view;
}(SearchModel, SearchOrder, SearchHelpers));