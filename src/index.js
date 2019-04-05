import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import cards from './data/cards';
import Game from './game';

ReactDOM.render(<Game cards={cards}/>, document.getElementById('root'));