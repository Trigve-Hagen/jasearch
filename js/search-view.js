var SearchView = (function (SearchHelpers) {
    var view = {}


    view.facets = getElement('#rsearch-facets')

    /* view.todoList = createElement('ul', 'todo-list')
    view.results.append(view.todoList)
    my.container = createElement('div', 'container')
    my.row = createElement('div', 'row')
    my.sidebar = createElement('div', 'col-12 col-md-3')
    my.content = createElement('div', 'col-12 col-md-9')
    my.form = createElement('form')
    my.searchbox = createElement('div', 'input-group mb-3')
    my.input = createElement('input', 'form-control')
    my.input.type = 'text'
    my.input.placeholder = 'Search with MySearch'
    my.input.name = 'mysearch-search'
    my.submitButton = createElement('button', 'btn btn-outline-secondary')
    my.submitButton.textContent = 'Search'
    my.searchbox.append(my.input, my.submitButton)
    my.form.append(my.searchbox)
    my.title = createElement('h1')
    my.title.textContent = 'Search'
    my.nodeList = createElement('ul', 'results')
    my.results.append(my.container)
    my.container.append(my.row)
    my.row.append(my.sidebar)
    my.row.append(my.content)
    my.content.append(my.title, my.form, my.nodeList) */

    function createFormElement(type, template, data) {
        var placeholder = "{{ element }}"
        var id = SearchHelpers.createId(data.name)
        var elementHtml = "<form>";
        if (type == 'select') {
            elementHtml += '<select name="' + id + '" id="' + id + '" class="' + data.elementClasses + '">';
            data.options.forEach(function (item) {
                elementHtml += '<option value="' + SearchHelpers.createId(item) + '" /> ' + item + '</option>';
            })
            elementHtml += '</select>';
        } else {
            var prefix = data.prefix != "na" ? data.prefix : ""
            var suffix = data.suffix != "na" ? data.suffix : ""
            var labelClasses = data.labelClasses != "na" ? data.labelClasses : ""
            data.options.forEach(function (item) {
                optionId = id + "-" + SearchHelpers.createId(item)
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

    function fillTemplate(template, data) {
        switch (data.type) {
            case 'select': template = createFormElement(data.type, template, data); break;
            case 'checkbox': template = createFormElement(data.type, template, data); break;
            case 'radio': template = createFormElement(data.type, template, data); break;
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

    function createFacetEvent(type, data) {
        var id = SearchHelpers.createId(data.name)
        if (type == 'select') {
            var selectElm = document.getElementById(id)
            selectElm.addEventListener('change', event => {
                console.log(event.target.value)
            })
        } else {
            data.options.forEach(function (item) {
                var selectElm = document.getElementById(id + "-" + SearchHelpers.createId(item))
                selectElm.addEventListener('change', event => {
                    console.log(event.target.id)
                })
            })
        }
    }

    view.createFacetEvents = function (data) {
        data.forEach(function (element) {
            switch (element.type) {
                case 'select': template = createFacetEvent(element.type, element); break;
                case 'checkbox': template = createFacetEvent(element.type, element); break;
                case 'radio': template = createFacetEvent(element.type, element); break;
            }
        })
    }

    view.fillList = function (template, dataArray) {
        var listString = ""
        dataArray.forEach(function (data) {
            listString += fillTemplate(template, data)
            console.log(data.type)
        })
        return listString
    }

    view.displayList = function (resultsList, id) {
        var results = getElement(id)
        results.innerHTML = resultsList
    }

    function createElement(tag, className) {
        const element = document.createElement(tag)

        if (className) {
            var parts = className.split(' ')
            if (parts.length > 1) {
                for (var i = 0; i < parts.length; i++) {
                    element.classList.add(parts[i])
                }
            } else element.classList.add(className)
        }

        return element
    }

    function getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    return view;
}(SearchHelpers));