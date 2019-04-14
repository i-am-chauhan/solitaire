import React from "react";
import "./index.css";
import FoundationPile from "./FoundationPile";

class Foundation extends React.Component {
	render() {
		return (
			<div className="foundation">
				<FoundationPile
					key="foundation_0"
					id="foundation_0"
					cards={this.props.cards[0]}
				/>
				<FoundationPile
					key="foundation_1"
					id="foundation_1"
					cards={this.props.cards[1]}
				/>
				<FoundationPile
					key="foundation_2"
					id="foundation_2"
					cards={this.props.cards[2]}
				/>
				<FoundationPile
					key="foundation_3"
					id="foundation_3"
					cards={this.props.cards[3]}
				/>
			</div>
		);
	}
}

export default Foundation;
