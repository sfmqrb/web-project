import React, { Component } from "react";
import _Card_ from "./common/card";
import NavBar from "./navBar";
import Footer from "./footer";
import SearchBox from "./searchBox";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

class CardSet extends Component {
  // state
  state = {
    originalCards: [
      {
        _id: 1,
        title: "title :: Card 1",
        name: "name :: Card 1",
        subheader: "subheader Card 1",
        image: "https://unsplash.it/400/300",
        body: "body :: Card 1",
        tags: ["ab", "ba", "cd", "de", "ge", "hi"],
        liked: false,
        onLike: () => {
          console.log("like");
        },
      },
      {
        _id: 2,
        title: "title :: Card 2",
        name: "name :: Card 2",
        subheader: "subheader Card 2",
        image: "https://unsplash.it/400/600",
        body: "body :: Card 2",
        tags: ["ab", "ba", "cd", "de", "ge", "hi"],
        liked: false,
        onLike: () => {
          console.log("like");
        },
      },
      {
        _id: 3,
        title: "title :: Card 3",
        name: "name :: Card 3",
        subheader: "subheader Card 3",
        image: "https://source.unsplash.com/random",
        body: "body :: Card 3",
        tags: ["ab", "ba", "cd", "de", "ge", "hi"],
        liked: true,
        onLike: () => {
          console.log("like");
        },
      },
      {
        _id: 4,
        title: "title :: Card 4",
        name: "name :: Card 4",
        subheader: "subheader Card 4",
        image: "https://unsplash.it/400/400",
        body: "body :: Card 4",
        tags: ["ab", "ba", "cd", "de", "ge", "hi"],
        liked: true,
        onLike: () => {
          console.log("like");
        },
      },
      {
        _id: 5,
        title: "title :: Card 5",
        name: "name :: Card 5",
        subheader: "subheader Card 5",
        image: "https://unsplash.it/410/400",
        body: "body :: Card 5",
        tags: ["ab", "ba", "cd", "de", "ge", "hi"],
        liked: true,
        onLike: () => {
          console.log("like");
        },
      },
      {
        _id: 6,
        title: "title :: Card 6",
        name: "name :: Card 6",
        subheader: "subheader Card 6",
        image: "https://unsplash.it/410/410",
        body: "body :: Card 6",
        tags: ["ab", "ba", "cd", "de", "ge", "hi"],
        liked: false,
        onLike: () => {
          console.log("like");
        },
      },
    ],
    cards: [],
    cardsAfterPagination: [],
    pageSize: 3,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({
      cards: this.state.originalCards,
      cardsAfterPagination: paginate(
        this.state.originalCards,
        1,
        this.state.pageSize
      ),
    });
  }

  handleChangeSearchBox(value) {
    let res = [...this.state.originalCards];
    res = res.filter((card) => {
      return (
        card.title.toLowerCase().includes(value.toLowerCase()) ||
        card.name.toLowerCase().includes(value.toLowerCase()) ||
        card.subheader.toLowerCase().includes(value.toLowerCase()) ||
        card.body.toLowerCase().includes(value.toLowerCase()) ||
        card.tags.includes(value.toLowerCase())
      );
    });

    this.setState({ cards: res });
  }

  handlePageChange = (page) => {
    // this.setState({ currentPage: page });
    const cards = paginate(this.state.cards, page, this.state.pageSize);
    // return cards;
    console.log(page);
    console.log(cards);
    this.setState({
      currentPage: page,
      cardsAfterPagination: cards,
    });
  };

  // render

  render() {
    console.log(this.props);
    return (
      <>
        <NavBar onChangeSearchBox={this.handleChangeSearchBox.bind(this)} />
        <Pagination
          itemsCount={this.state.cards.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
        <div className="m-5">
          <div className="row m-0  justify-content-around border-top">
            {this.state.cardsAfterPagination.map((card) => (
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
