(function ($, SearchModel, SearchView, SearchHelpers) {
    $.fn.initializeSearch = function (args) {
        var facetData = SearchModel.getData(args.facetsPath)
        SearchView.displayList(SearchView.fillList(
            args.resultsTemplate,
            SearchModel.getData(args.resultsPath)
        ), 'search-results')
        SearchView.displayList(SearchView.fillList(
            args.facetsTemplate,
            facetData
        ), 'search-facets')
        SearchView.createFacetEvents(facetData);
    }
}(jQuery, SearchModel, SearchView, SearchHelpers))