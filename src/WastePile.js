import React from "react";
import "./index.css";
import Card from "./Card";

class WastePile extends React.Component {
	constructor(props) {
		super(props);
	}

	getPile(cards, count) {
		const cardsHtml = cards.map((card) => {
			let key = `${card.type}_${card.number}`;
			return <Card key={key} id={`wastePile_${count}`} data={card} />;
    });
		return (
			<div
				className="waste-pile"
				onClick={this.props.func.bind(null, count)}
        id={`wastePile_${count}`}
        key={`wastePile_${count}`}
			>
				{cardsHtml}
			</div>
		);
	}

	render() {
		const piles = this.props.cards.map(this.getPile, this);
		return (
			<div className="waste-pile-container" id="wastePile_0_container">
				{piles}
			</div>
		);
	}
}

export default WastePile;
