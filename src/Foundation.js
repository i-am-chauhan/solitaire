import React from 'react';
import './index.css';
import FoundationPile from './FoundationPile';

class Foundation extends React.Component {

  render(){
    return (
    <div className="foundation">
      <FoundationPile key="foundation1"/>
      <FoundationPile key="foundation2"/>
      <FoundationPile key="foundation3"/>
      <FoundationPile key="foundation4"/>
    </div>
    );
  }
}

export default Foundation;