import React from 'react';
import './index.css';
import Card from "./Card";

class WastePile extends React.Component {

  constructor(props){
    super(props);
  }

  getPile() {
    return this.props.cards.map(card => {
      let key = `${card.type}_${card.number}`;
      return (<Card key={key} id="wastePile_0" data={card} />);
    })
  }

  render() {
    return (
      <div className="waste-pile" id="wastePile_0"></div>
    );
  };
}

export default WastePile;