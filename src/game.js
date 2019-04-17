import React from "react";
import "./index.css";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import Tableau from "./Tableau";
import Deck from "./Deck";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.deck = new Deck(props.cards);
		this.state = {
			wastePile: this.deck.getWastePile(),
			foundation: this.deck.getFoundationPile(),
			tableau: this.deck.getTableauPile()
		};
	}

	allowDrop(ev) {
		ev.preventDefault();
	}

	_showCard(card) {
		card.visible = true;
		return card;
	}

	_hideCard(card) {
		card.visible = false;
		return card;
	}

	handleOnClick(count) {
		if (count != 0) return;
		const newState = Object.assign({}, this.state);
		const piles = newState.wastePile;
		let wastePile1 = piles[0];
		if (wastePile1.length == 0) {
			piles[0] = wastePile1.concat(piles[1].map(this._hideCard));
			piles[1] = [];
			this.setState(() => newState);
			return;
		}
		const card = this._showCard(wastePile1.pop());
		piles[1].push(card);
		this.setState(() => newState);
	}

	_getCardById(id) {
		const { type, number } = this.parseId(id);
		return this.props.cards.filter((card) => {
			return card.type == type && card.number == number;
		})[0];
	}

	_findCardAndRemove(id) {
		const { typeOfPile, pileIndex } = this.parseId(id);
		const piles = Object.assign({}, this.state);
		let pile = piles[typeOfPile][pileIndex];
		const cardIndex = pile.indexOf(this._getCardById(id));
		piles[typeOfPile][pileIndex] = pile.slice(0, cardIndex);
		return piles;
	}

	parseId(id) {
		const [typeOfPile, pileIndex] = id.split("_").slice(0, 2);
		const [type, number] = id.split("_").slice(-2);
		return { typeOfPile, pileIndex, type, number };
	}

	_getAllCardsBelow(id) {
		const { typeOfPile, pileIndex } = this.parseId(id);
		const pile = this.state[typeOfPile][pileIndex];
		const cardIndex = pile.indexOf(this._getCardById(id));
		return pile.slice(cardIndex);
	}

	updateFoundation(targetId, id) {
		const { typeOfPile, pileIndex } = this.parseId(targetId);
		const targetPile = this.state[typeOfPile][pileIndex];
		const dropedCard = this._getCardById(id);
		const targetCard = targetPile[targetPile.length - 1];
		if (!targetCard && dropedCard.number != "1") return;
		if (targetCard && !this.isAbleToGoInFoundation(targetCard, dropedCard))
			return;
		const cards = this._getAllCardsBelow(id);
		if (cards.length != 1) return;
		const piles = this._findCardAndRemove(id);
		piles[typeOfPile][pileIndex].push(cards[0]);
		this.setState((state) => piles);
	}

	hasNextRank(firstCard, secondCard) {
		return +firstCard.number == +secondCard.number + 1;
	}

	isOfSameColor(firstCard, secondCard) {
		return firstCard.color == secondCard.color;
	}

	isNotAbleToDrop(firstCard, secondCard) {
		return (
			!this.hasNextRank(firstCard, secondCard) ||
			this.isOfSameColor(firstCard, secondCard)
		);
	}

	isOfSameSuite(firstCard, secondCard) {
		return firstCard.type == secondCard.type;
	}

	isAbleToGoInFoundation(firstCard, secondCard) {
		return (
			this.isOfSameSuite(firstCard, secondCard) &&
			this.hasNextRank(secondCard, firstCard)
		);
	}

	updateTableau(targetId, id) {
		const { typeOfPile, pileIndex } = this.parseId(targetId);
		const targetPile = this.state[typeOfPile][pileIndex];
		const dropedCard = this._getCardById(id);
		const targetCard = targetPile[targetPile.length - 1];
		if (!targetCard && dropedCard.number != "13") return;
		if (targetCard && this.isNotAbleToDrop(targetCard, dropedCard)) return;
		const cards = this._getAllCardsBelow(id);
		const piles = this._findCardAndRemove(id);
		piles[typeOfPile][pileIndex] = piles[typeOfPile][pileIndex].concat(cards);
		this.setState((state) => piles);
	}

	updatePiles(targetId, id) {
		const { typeOfPile } = this.parseId(targetId);
		if (typeOfPile == "foundation") this.updateFoundation(targetId, id);
		if (typeOfPile == "tableau") this.updateTableau(targetId, id);
		return;
	}

	isWon() {
		const totalCards = this.state.foundation.reduce((inital, cards) => {
			return inital + cards.length;
    }, 0);
    return totalCards == 52;
	}

  showWinning(){
    document.getElementById('overlay').style.display = "flex";
    document.getElementById('pop-up-container').style.display = "flex";
  }

	drop(event) {
		event.preventDefault();
		const targetId = event.target.id;
		const id = event.dataTransfer.getData("id");
		this.updatePiles(targetId, id);
		if(this.isWon()) this.showWinning();
	}

	getAllComponents() {
		return (
			<div
				className="game"
				onDrop={this.drop.bind(this)}
				onDragOver={this.allowDrop}
			>
				<div className="top-part">
					<WastePile
						cards={this.state.wastePile}
						func={this.handleOnClick.bind(this)}
					/>
					<Foundation cards={this.state.foundation} />
				</div>
				<Tableau cards={this.state.tableau} />
			</div>
		);
	}

	render() {
		return this.getAllComponents();
	}
}

export default Game;
