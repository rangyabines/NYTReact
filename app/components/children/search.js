// Include React
var React = require('react');

// This is the form component.
var Form = React.createClass({


	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								<h4 className=""><strong>Topic</strong></h4>

								{/*Note how each of the form elements has an id that matches the state. This is not necessary but it is convenient.
									Also note how each has an onChange event associated with our handleChange event.
								*/}
								<input type="text" className="form-control text-center" id="term" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>Start Year</strong></h4>
								<input type="text" className="form-control text-center" id="term2" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>End Year</strong></h4>
								<input type="text" className="form-control text-center" id="term3" onChange= {this.handleChange} required/>
								<br />
								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
							</div>

						</form>
				</div>
			</div>



		)
	}
});

// Export the component back for use in other files
module.exports = Form;
