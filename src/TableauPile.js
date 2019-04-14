import React from "react";
import "./index.css";
import Card from "./Card";

class TableauPile extends React.Component {
	constructor(props) {
		super(props);
	}

	_showLastCard(cards) {
		if (cards.length < 1) return cards;
		const visibleCard = cards[cards.length - 1];
		visibleCard.visible = true;
		return cards;
	}

	_getHeight(count) {
		const length = this.props.cards.length;
		return 40 * (length - count) + 160;
	}

	getPile() {
		let count = 1;
		let top = -40;
		const cards = this._showLastCard(this.props.cards);
		return cards.map(function(card) {
			let key = `${card.type}_${card.number}`;
			top += 40;
			return (
				<Card
					key={key}
					id={this.props.id}
					height={this._getHeight(count)}
					top={top}
					zindex={count++}
					data={card}
				/>
			);
		}, this);
	}

	render() {
		return (
			<div className="tableauPile" id={this.props.id}>
				{this.getPile()}
			</div>
		);
	}
}

export default TableauPile;
