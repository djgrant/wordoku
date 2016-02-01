import React from 'react';
import Grid from './Grid';
import Valid from './Valid';

var App = React.createClass({
	render: function () {
		return (
			<div className="container">
        <h1>Worduko!</h1>
				<Grid />
        <Valid />
			</div>
		);
	}
});

export default App;
