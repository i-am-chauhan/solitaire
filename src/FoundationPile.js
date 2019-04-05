import React from 'react';
import './index.css';
import Card from "./Card";

class FoundationPile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cards: [], key: props.key };
    this.render = this.render.bind(this);
    this.getPile = this.getPile.bind(this);
  }

  getPile() {
    return this.state.cards.map(card => {
      let key = `${card.type}_${card.number}`;
      return (<Card key={key} data={card}/>)
    })
  }

  render() {
    return (
      <div className="foundationPile" >{this.getPile()}</div>
    );
  };
}

export default FoundationPile;