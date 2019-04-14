import React from "react";
import "./index.css";
import Card from "./Card";

class FoundationPile extends React.Component {
	constructor(props) {
		super(props);
	}

	getPile() {
		return this.props.cards.map((card) => {
			let key = `${card.type}_${card.number}`;
			return <Card key={key} id={this.props.id} data={card} />;
		});
	}

	render() {
		return (
			<div className="foundationPile" id={this.props.id}>
				{this.getPile()}
			</div>
		);
	}
}

export default FoundationPile;
