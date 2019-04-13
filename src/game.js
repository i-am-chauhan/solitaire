import React from 'react';
import './index.css';
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import Tableau from "./Tableau";
import Deck from "./Deck";

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.deck = new Deck(props.cards)
    this.state = {
      wastePile: this.deck.getWastePile(),
      foundation: this.deck.getFoundationPile(),
      tableau: this.deck.getTableauPile()
    };
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  _getCardById(id) {
    const [type, number] = id.split('_').slice(-2);
    return this.props.cards.filter(card => {
      return card.type == type && card.number == number;
    })[0];
  }

  _findCardAndRemove(card) {
    const piles = Object.assign({}, this.state);
    Object.keys(piles).forEach(pile => {
      piles[pile] = piles[pile].map(cards => {
        let isPresent = cards.includes(card);
        if (isPresent) cards = cards.filter(anyCard => anyCard != card);
        return cards;
      });
    });
    return piles;
  }

  updatePiles(card, targetId) {
    const [typeOfPile, index] = targetId.split('_').slice(0, 2);
    if(!typeOfPile) return;
    const piles = this._findCardAndRemove(card);
    piles[typeOfPile][index].push(card);
    this.setState(state => piles);
  }

  drop(event) {
    event.preventDefault();
    const targetId = event.target.id;
    const id = event.dataTransfer.getData('id');
    const card = this._getCardById(id);
    this.updatePiles(card, targetId);
  }

  getAllComponents() {
    return (
      <div
        className="game"
        onDrop={this.drop.bind(this)}
        onDragOver={this.allowDrop}
      >
        <div className="top-part">
          <WastePile cards={this.state.wastePile} />
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