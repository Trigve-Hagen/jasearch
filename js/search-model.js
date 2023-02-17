var SearchModel = (function () {
    var model = {}

    model.searchData = getData(searchPath)
    model.facetsData = getData(facetsPath)

    /**
     * Private function
     * Gets JSON data via AJAX.
     *
     * @param string path
     *   The path to retrieve the json either a function call in php script that returns
     *   JSON or a JSON file.
     */
    function getData(path) {
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