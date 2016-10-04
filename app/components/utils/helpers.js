// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// NYT API
var articleSearchAPI = "d50dbc57744547ada05425274cf81b93";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the article search.
	runQuery: function(topic){

		console.log(topic);

		//article search
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + topic + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(nytdata){
				console.log(nytdata);

				console.log(nytdata.data.response.docs);

				return nytdata.data.response.docs


			})
	},

	// This function hits our own server to retrieve the record of query results
	getArticle: function(){

		return axios.get('/api/saved')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postArticle: function(topic){

		return axios.post('/api/saved', {topic: topic})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function
module.exports = helpers;
