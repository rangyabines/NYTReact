// Include React
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Search');
var Results = require('./Children/Results');
var History = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component.
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			results: ""
		}
	},

	// This function allows childrens to update the parent.
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	// If the component changes (i.e. if a search is entered)...
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			// Run the query for the address
			helpers.runQuery(this.state.searchTerm)
				.then(function(data){
					if (data != this.state.results)
					{
						console.log("TOPIC", data);

						this.setState({
							results: data
						})

						
	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">New York Times Article</h2>
						<p className="text-center"><em>Search for and annotate articles of intesrest.</em></p>
					</div>

					<div className="col-md-6">

						<Form setTerm={this.setTerm}/>

					</div>

					<div className="col-md-6">

						<Results address={this.state.results} />

					</div>

				</div>

				{/* <div className="row">

					<History history={this.state.history}/>

				</div> */}

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;
