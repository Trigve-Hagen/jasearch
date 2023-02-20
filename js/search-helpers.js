let SearchHelpers = (function () {
    let helper = {}

    /**
     * Public function
     * Creates an id from a name.
     * 
     * Splits a name by spaces and replaces the spaces with dashes.
     *
     * @param string text
     *   The text to create the id from.
     * 
     * @return string
     *   The string convered to name-option
     */
    helper.createId = function (text) {
        let parts = text.toLowerCase().split(" ")
        let id = parts.join("-")
        return id
    }

    /**
     * Public function
     * Camel cases a name.
     * 
     * camelCase
     *
     * @param string str
     *   The text to create the id from.
     * 
     * @return string
     *   The camelCase string
     */
    helper.toCamelCase = function (str) {
        return str
            .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
            .replace(/\s/g, '')
            .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
    }

    /**
     * Public function
     * Splits the id to get the name of the filter.
     * 
     * @param string id
     *   The id of the filter. name-option
     * 
     * @return string
     *   The filter name.
     */
    helper.getFilterName = function (id) {
        return id.split("-")[0]
    }

    /**
     * Public function
     * Splits the id to get the option of the filter.
     * 
     * @param string id
     *   The id of the filter. name-option
     * 
     * @return string
     *   The filter option.
     */
    helper.getFilterOption = function (id) {
        return id.split("-")[1]
    }

    /**
     * Public function
     * Checks if an element has a class.
     * 
     * @param object element
     *   The element object
     * @param string className
     *   The class you are looking for.
     * 
     * @return bool
     *   If the element has the class.
     */
    helper.hasClass = function (element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    return helper;
}());