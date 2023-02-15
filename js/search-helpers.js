var SearchHelpers = (function () {
    var helper = {}

    helper.createId = function (text) {
        var parts = text.toLowerCase().split(" ")
        var id = parts.join("-")
        return id
    }

    return helper;
}());