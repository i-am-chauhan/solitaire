import React from 'react';
import './index.css';
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import lodash from 'lodash';
import Tableau from "./Tableau";

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = { cards: props.cards };
  }


  hideCards(cards){
    return cards.map(card => {
      card.vissible = false;
      return card;
    });
  }

  getAllComponents() {
    const cards = lodash.shuffle(this.state.cards);
    return (
      <div className="game">
        <div className="top-part">
        <WastePile cards={this.hideCards(cards.slice(0, 24))} />
        <Foundation />
        </div>
        <Tableau cards={this.hideCards(cards.slice(24))} />
      </div>
    );
    // components.push(<WastePile cards={cards.slice(0, 24)} />);
    // components.push(<Foundation />);
    // components.push(<Tableau cards={cards.slice(24)} />);
    // return components;
  }

  render() {
    return this.getAllComponents();
  }
}

export default Game;