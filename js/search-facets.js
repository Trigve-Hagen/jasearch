(function ($, SearchModel, SearchView, SearchHelpers) {
    $.fn.initializeSearch = function (args) {
        var facetData = SearchModel.getData(facetsPath)
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("resultsTemplate"),
            SearchModel.getData(searchPath)
        ), 'search-results')
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("facetsTemplate"),
            facetData
        ), 'search-facets')
        SearchView.createFacetEvents(facetData);
    }
}(jQuery, SearchModel, SearchView, SearchHelpers))