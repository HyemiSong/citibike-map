import React from 'react';

class Summary extends React.Component {
	constructor(){
		super();
	}

	render(){
        return (
        	<div>
	        	<div> {`Total: ${this.props.totalCount}`} </div>
        	</div>
        )
	}
}

export default Summary;