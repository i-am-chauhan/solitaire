import React from 'react';
import './index.css';
import TableauPile from "./TableauPile";

class Tableau extends React.Component {

  constructor(props) {
    super(props);
  }

splitCards() {
    return this.props.cards.map((cards, number) => {
      return (
        <TableauPile
          key={`tableau_${number}`}
          id={`tableau_${number}`}
          cards={cards}
        />
      );
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