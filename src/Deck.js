import cards from './data/cards';
import lodash from 'lodash';

class Deck {
  constructor(cards) {
    this.cards = lodash.shuffle(cards);
    this.wastePile = this.cards.slice(0, 24);
    this.tableauPile = this.cards.slice(24);
  }

  hideCards(cards) {
    return cards.map(card => {
      card.visible = false;
      return card;
    });
  }

  getWastePile() {
    return [this.hideCards(this.wastePile), []];
  }

  _splitCards() {
    const cardsInPiles = [1, 2, 3, 4, 5, 6, 7];
    let cards = this.tableauPile.slice();
    return cardsInPiles.map(function (number) {
      let cardsInEachPile = this.hideCards(cards.slice(0, number));
      cards = cards.slice(number);
      return cardsInEachPile;
    }, this)
  }

  getTableauPile() {
    return this._splitCards();
  }

  getFoundationPile() {
    return [[], [], [], []];
  }
}

export default Deck;