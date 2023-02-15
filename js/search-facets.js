(function ($, SearchModel, SearchView, SearchHelpers) {
    $.fn.initializeSearch = function (args) {
        var facetData = SearchModel.getData(facetsPath)
        var searchData = SearchModel.getData(searchPath)
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("resultsTemplate"),
            searchData
        ), 'search-results')
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("facetsTemplate"),
            facetData
        ), 'search-facets')
        SearchView.createFacetEvents(facetData);
        SearchView.createSearchEvent(searchData);
    }
}(jQuery, SearchModel, SearchView, SearchHelpers))