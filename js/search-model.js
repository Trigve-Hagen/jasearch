let SearchModel = (function () {
    let model = {}

    /**
     * Public property
     * All search items.
     */
    model.searchData = getData(searchPath)

    /**
     * Public property
     * All filter items.
     */
    model.filtersData = getData(filtersPath)

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
            let json = null;
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