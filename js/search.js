(function ($, SearchModel, SearchView, SearchHelpers) {
    $.fn.initializeSearch = function (args) {
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("resultsTemplate"),
            SearchModel.searchData
        ), 'search-results')
        SearchView.displayList(SearchView.fillList(
            SearchView.getTemplate("filtersTemplate"),
            SearchModel.filtersData
        ), 'search-filters')
        SearchView.createFacetEvents();
        SearchView.createSearchEvent();
    }
}(jQuery, SearchModel, SearchView, SearchHelpers))