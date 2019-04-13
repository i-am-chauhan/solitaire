import React from 'react';
import './index.css';

class Card extends React.Component {

  drag(event) {
    event.dataTransfer.setData('id', event.target.id);
  }

  isDraggable() {
    return this.props.data.visible;
  }

  getId() {
    const card = this.props.data;
    return `${this.props.id}_${card.type}_${card.number}`;
  }

  getCardId() {
    const card = this.props.data;
    return `${this.props.id}_card_${card.type}_${card.number}`;
  }

  getHeight(){
    return (160 + this.props.top) + "px";
  }

  getPositionTop(){
    return this.props.top + "px";
  }

  getImg(){
    const card = this.props.data;
    if(!card.visible) return "";
    return `url(./cards_img/${card.background})`;
  }

  render() {
    return (
      <div
        className="card_container"
        style={{top:this.getPositionTop(), height:this.getHeight()}}
        id={this.getId()}
        draggable={this.isDraggable.call(this)}
        onDragStart={this.drag.bind(this)}
      >
        <div id={this.getCardId()} className="card" style={{ backgroundImage: this.getImg() }}></div>
      </div>
    );
  }
}

export default Card;