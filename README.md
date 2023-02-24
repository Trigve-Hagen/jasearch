# JASearch
A javaScript library for searching content using AJAX calls that return JSON. Also has support for facets using JSON. Under construction.

All search results must have a unique id to filter results with. (filter algorithum uses id for filtering the results)  



img  
js  
&emsp;json  
&emsp;&emsp;filters.js  
&emsp;&emsp;results.js  
&emsp;search-helpers.js - Helper functions.  
&emsp;search-model.js - Loads the data via ajax from the paths in index.html.  
&emsp;search-order.js - Creates an array of search and/or filters in the order they are used.  
&emsp;search-results.js - Holds the searchResults so they can be combined with new search results in the event that the next search is an addition to the results instead of a refinement of the exising results.  
&emsp;search-view.js - Does most of the work. Creates filter events, handlers and builds the view using templates created in index.html.  
&emsp;search.js - The main controller.  
index.html - The entry point for the application.    
README.md  

Related Links  
<a href="http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html" target="_blank">JavaScript-Module-Pattern-In-Depth</a>  
<a href="https://www.taniarascia.com/javascript-mvc-todo-app/" target="_blank">Build a Simple MVC App</a>  
<a href="https://livebook.manning.com/book/get-programming-with-javascript" target="_blank">get-programming-with-javascript</a>  
<a href="https://eloquentjavascript.net/" target="_blank">Eloquent Javascript</a>