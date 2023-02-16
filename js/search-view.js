var SearchView = (function (SearchModel, SearchOrder, SearchHelpers) {
    var view = {}

    /**
     * Private helper function
     * Creates checkbox, radio and select form elements.
     *
     * Creates facet form elements from the JSON data provided.
     *
     * @param string type
     *   The type of element to ceate. Checkbox, radio or select.
     * @param string template
     *   The template created in index.html.
     * @param object data
     *   An oject from JSON containing the facet data.
     * 
     * @return string template
     */
    function createFormElement(type, template, data) {
        var placeholder = "{{ element }}"
        var id = SearchHelpers.toCamelCase(data.name)
        var elementHtml = "<form>";
        if (type == 'select') {
            elementHtml += '<select name="' + id + '" id="' + id + '" class="' + data.elementClasses + '">';
            data.options.forEach(function (item) {
                elementHtml += '<option value="' + SearchHelpers.createId(item) + '" /> ' + item + '</option>';
            })
            elementHtml += '</select>';
        } else if (type == "button") {
            var prefix = data.prefix != "na" ? data.prefix : ""
            var suffix = data.suffix != "na" ? data.suffix : ""
            data.options.forEach(function (item) {
                var optionId = id + "-" + SearchHelpers.createId(item)
                elementHtml += prefix
                elementHtml += '<button type="button" id="' + optionId + '" class="' + data.elementClasses + '" /> ' + item + '</button>';
                elementHtml += suffix
            })
        } else {
            var prefix = data.prefix != "na" ? data.prefix : ""
            var suffix = data.suffix != "na" ? data.suffix : ""
            var labelClasses = data.labelClasses != "na" ? data.labelClasses : ""
            data.options.forEach(function (item) {
                var optionId = id + "-" + SearchHelpers.createId(item)
                elementHtml += prefix;
                elementHtml += '<input type="' + type + '" class="' + data.elementClasses + '" name="' + id + '" id="' + optionId + '" />'
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
     *   An oject from JSON containing the facet data.
     * 
     * @return string template
     */
    function fillTemplate(template, data) {
        switch (data.type) {
            case 'select': template = createFormElement(data.type, template, data); break;
            case 'checkbox': template = createFormElement(data.type, template, data); break;
            case 'radio': template = createFormElement(data.type, template, data); break;
            case 'button': template = createFormElement(data.type, template, data); break;
        }
        Object.keys(data).forEach(function (key) {
            var placeholder = "{{ " + key + " }}"
            var value = data[key]

            while (template.indexOf(placeholder) !== -1) {
                template = template.replace(placeholder, value)
            }
        })
        return template
    }

    /**
     * Private helper function
     * Filter the search when a facet is selected.
     * Test all possibilities of none string conditions
     *
     * @param oject event
     *   The facet's event object
     * @param string facetsData
     *   A JSON array of facet objects.
     * @param object searchData
     *   A JSON array of result objects.
     */
    function filterElements(event, facetsData, searchData) {
        var filteredData = []
        facetsData.forEach(function (facetItem) {
            facetItem.options.forEach(function (option) {
                if (facetItem.type == "select") {
                    //console.log(option + " - " + event.target.value)
                    if (SearchHelpers.createId(option) == event.target.value) {
                        searchData.forEach(function (searchItem) {
                            var keys = Object.keys(searchItem);
                            keys.forEach(function (key) {
                                // console.log(SearchHelpers.createId(facetItem.name) + " - " + key)
                                if (SearchHelpers.createId(facetItem.name) == key && searchItem[SearchHelpers.createId(facetItem.name)] == event.target.value) {
                                    filteredData.push(searchItem)
                                    var queId = SearchHelpers.createId(facetItem.name) + "-" + SearchHelpers.createId(option)
                                    if (!SearchOrder.ifExists(queId)) {
                                        SearchOrder.addItem({
                                            "id": queId,
                                            "type": facetItem.type
                                        })
                                    }
                                }
                            })
                        })
                    }
                } else {
                    // console.log(SearchHelpers.createId(option) + " - " + SearchHelpers.getFilterOption(event.target.id))
                    if (SearchHelpers.createId(option) == SearchHelpers.getFilterOption(event.target.id)) {
                        searchData.forEach(function (searchItem) {
                            var keys = Object.keys(searchItem);
                            keys.forEach(function (key) {
                                // console.log(SearchHelpers.toCamelCase(facetItem.name) + " - " + key + " & " + searchItem[SearchHelpers.toCamelCase(facetItem.name)] + " - " + SearchHelpers.getFilterOption(event.target.id))
                                if (SearchHelpers.toCamelCase(facetItem.name) == key && searchItem[SearchHelpers.toCamelCase(facetItem.name)].toString() == SearchHelpers.getFilterOption(event.target.id)) {
                                    // console.log(facetItem.type)
                                    filteredData.push(searchItem)
                                    var queId = SearchHelpers.toCamelCase(facetItem.name) + "-" + SearchHelpers.createId(option)
                                    if (!SearchOrder.ifExists(queId)) {
                                        SearchOrder.addItem({
                                            "id": queId,
                                            "type": facetItem.type
                                        })
                                    }
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
            filteredData
        ), 'search-results')
    }

    /**
     * Private helper function
     * Creates Facet checkbox, radio and select form element change events.
     *
     * @param string type
     *   The type of element to ceate. Checkbox, radio or select.
     * @param object data
     *   An oject from JSON containing the facet data.
     */
    function createFacetEvent(type, data) {
        var id = SearchHelpers.toCamelCase(data.name)
        // Get fresh data
        var facetsData = SearchModel.getData(facetsPath)
        var searchData = SearchModel.getData(searchPath)

        if (type == 'select') {
            var selectElm = document.getElementById(id)
            selectElm.addEventListener('change', event => {
                filterElements(event, facetsData, searchData)
            })
        } else if (type == "button") {
            data.options.forEach(function (item) {
                var selectElm = document.getElementById(id + "-" + SearchHelpers.createId(item))
                selectElm.addEventListener('click', event => {
                    filterElements(event, facetsData, searchData)
                })
            })
        } else {
            data.options.forEach(function (item) {
                var selectElm = document.getElementById(id + "-" + SearchHelpers.createId(item))
                selectElm.addEventListener('change', event => {
                    filterElements(event, facetsData, searchData)
                })
            })
        }
    }

    /**
     * Public function
     * Creates search form submit event.
     *
     * @param JSON data
     *   JSON containing search results data.
     */
    view.createSearchEvent = function (data) {
        var searchBtn = document.getElementById("search-submit")
        var searchInput = document.getElementById("search-input")
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
     *   JSON containing facet data.
     */
    view.createFacetEvents = function (data) {
        data.forEach(function (element) {
            switch (element.type) {
                case 'select': template = createFacetEvent(element.type, element); break;
                case 'checkbox': template = createFacetEvent(element.type, element); break;
                case 'radio': template = createFacetEvent(element.type, element); break;
                case 'button': template = createFacetEvent(element.type, element); break;
            }
        })
        var resetElm = document.getElementById("reset-facets")
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
     *   JSON containing search results or facet data.
     * 
     * @return string list of populated templates
     */
    view.fillList = function (template, dataArray) {
        var listString = ""
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
        var results = document.getElementById(id)
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
        var template = document.getElementById(id);
        return template.innerHTML;
    }

    return view;
}(SearchModel, SearchOrder, SearchHelpers));