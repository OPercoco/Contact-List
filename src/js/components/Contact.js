var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');



var Contact = React.createClass({
	
	render: function(){
		
		return(
				<tr>
					<td>{this.props.contact.name}</td>
					<td>{this.props.contact.email}</td>
					<td>{this.props.contact.phone}</td>
					<td><a href="#" className="btn btn-danger" onClick={this.handleRemove.bind(this, this.props.contact.id)}> Remove </a></td>
				</tr>
			)
	},
	handleRemove: function(i, j){
		AppActions.removeContact(i);
	}
});

module.exports = Contact;