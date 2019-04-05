import React from 'react';
import './index.css';
import Card from "./Card";

class TableauPile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: props.cards, id: props.id };
    this.render = this.render.bind(this);
    this.getPile = this.getPile.bind(this);
  }

  getPile() {
    return this.state.cards.map(card => {
      let key = `${card.type}_${card.number}`;
      return (<Card key={key} id={key} data={card} />);
    })
  }

  render() {
    return (
      <div className="tableauPile">{this.getPile()}</div>
    );
  };
}

export default TableauPile;