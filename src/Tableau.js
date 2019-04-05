import React from 'react';
import './index.css';
import TableauPile from "./TableauPile";

class Tableau extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cards: props.cards };
    this.render = this.render.bind(this);
    this.splitCards = this.splitCards.bind(this);
  }


  showLastCard(cards) {
    if (cards.length < 1) return cards;
    const visibleCard = cards[cards.length - 1];
    visibleCard.vissible = true;
    return cards;
  }

  splitCards() {
    const cardsInPiles = [1, 2, 3, 4, 5, 6, 7];
    let cards = this.state.cards.slice();
    return cardsInPiles.map((number) => {
      let cardsInEachPile = this.showLastCard(cards.slice(0, number));
      cards = cards.slice(number);
      return <TableauPile key={`tableau${number}`} id={`tableau${number}`} cards={cardsInEachPile} />
    })
  }

  render() {
    return (
      <div className="bottom-part">
        {this.splitCards()}
      </div>
    );
  }
}

export default Tableau;