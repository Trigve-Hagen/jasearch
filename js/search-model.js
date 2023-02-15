var SearchModel = (function () {
    var model = {}

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