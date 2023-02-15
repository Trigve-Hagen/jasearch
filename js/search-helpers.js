var SearchHelpers = (function () {
    var helper = {}

    /**
     * Public function
     * Creates an id from a name.
     * 
     * Splits a name by spaces and replaces the spaces with dashes.
     *
     * @param string text
     *   The text to create the id from.
     */
    helper.createId = function (text) {
        var parts = text.toLowerCase().split(" ")
        var id = parts.join("-")
        return id
    }

    return helper;
}());