import React from 'react';
import './index.css';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, key: props.id };
    this.getClassName = this.getClassName.bind(this);
    this.getUnicode = this.getUnicode.bind(this);
  }

  getClassName() {
    const card = this.state.data;
    if (card.color == 'red' && card.vissible) {
      return "red-card";
    }
    return 'black-card';
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('id');
    event.target.appendChild(document.getElementById(id));
  }

  drag(event) {
    event.dataTransfer.setData('id', event.target.id);
  }

  isDraggable(){
    return this.state.data.vissible;
  }

  getId(){
    const card = this.state.data;
    return `${card.type}_${card.number}`;
  }

  getUnicode(){
    const card = this.state.data;
    if(card.vissible) return card.unicode;
    return "\u{1f0a0}";
  }

  render() {
    return (
      <div
        id={this.getId()}
        className={this.getClassName()}
        draggable={this.isDraggable.call(this)}
        onDragStart={this.drag.bind(this)}
        onDrop={this.drop.bind(this)}
        onDragOver={this.allowDrop}
      >
        {this.getUnicode()}
      </div>
    );
  }
}

export default Card;