import React, { Component, useState, useEffect } from "react";

import "./StockTicker.css";

import Ticker from "react-ticker";

function rand(min, max) {
  var offset = min;
  var range = max - min + 1;
  var randomNumber = Math.floor(Math.random() * range) + offset;
  return randomNumber;
}

const names = [
  "Captain Ahab  ",
  "Ishmael  ",
  "Moby Dick  ",
  "Ashore  ",
  "Tashtego  ",
  "Pip (The cabin boy)  ",
  "The Manxman  ",
  "Dough Boy  ",
  "Derick de Deer  "
];

function apiCall() {
  const number = rand(0, 8);
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(number);
    }, 500);
  });
}

const getTextFromApi = async index => {
  const text = await apiCall();
  return text;
};

const TextFromApi = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    getTextFromApi().then(text => {
      setText(names[text]);
    });
  }, []);

  return text ? <h1>{text}</h1> : <h1>Placeholder</h1>;
};

export default class StockTicker extends Component {
  state = {
    move: true
  };

  onClick = () => {
    this.setState(prevState => ({
      move: !prevState.move
    }));
  };

  render() {
    return (
      <div>
        <Ticker offset="run-in" speed={10} move={this.state.move}>
          {({ index }) =>
            index === 0 ? <h1>Some Names:</h1> : <TextFromApi />
          }
        </Ticker>
      </div>
    );
  }
}
