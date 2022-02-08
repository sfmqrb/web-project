import React, { Component } from "react";
import _Card_ from "./common/card";
import NavBar from "./navBar";
import Footer from "./footer";
import SearchBox from "./searchBox";

class CardSet extends Component {
  render() {
    console.log(this.props);
    const cards = this.props.cards;
    return (
      <>
        <NavBar />
        <div className="m-5">
          <div className="row m-0  justify-content-around border-top">
            {cards.map((card) => (
              <_Card_ key={card._id} {...card} />
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default CardSet;
