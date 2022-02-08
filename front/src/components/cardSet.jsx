import React, { Component } from "react";
import _Card_ from "./common/card";

class CardSet extends Component {
  render() {
    console.log(this.props);
    const cards = this.props.cards;
    return (
      <div className="row m-5 d-flex flex-wrap justify-content-around align-items-center py-3 my-4 border-top">
        {cards.map((card) => (
          <_Card_ key={card._id} {...card} />
        ))}
      </div>
    );
  }
}

export default CardSet;
