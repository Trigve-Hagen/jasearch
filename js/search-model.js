var SearchModel = (function () {
    var model = {}

    /**
     * Public function
     * Gets JSON data via AJAX.
     *
     * @param string path
     *   The path to retrieve the json either a function call in php script that returns
     *   JSON or a JSON file.
     */
    model.getData = function (path) {
        return (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': path,
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })()
    }

    return model;
}());