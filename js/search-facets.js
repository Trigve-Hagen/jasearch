(function ($, SearchModel, SearchView, SearchHelpers) {
    $.fn.initializeSearch = function (args) {
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("resultsTemplate"),
            SearchModel.searchData
        ), 'search-results')
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("facetsTemplate"),
            SearchModel.facetsData
        ), 'search-facets')
        SearchView.createFacetEvents();
        SearchView.createSearchEvent();
    }
}(jQuery, SearchModel, SearchView, SearchHelpers))