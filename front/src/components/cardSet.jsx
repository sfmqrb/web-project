import React, { Component } from "react";
import _Card_ from "./common/card";
import NavBar from "./DefaultPages/navBar";
import Footer from "./DefaultPages/footer";
import { paginate } from "../utils/paginate";
import ax from "../services/httpService";
import Pagination from "./common/pagination";
import getFakeCard from "../services/fakeCard";
import { Redirect } from "react-router-dom";
import cfg from "../config.json";
import getHeader from "../utils/getHeader";
import {toast} from "react-toastify";
import {backFoodIngToFoodIngredient, backRecipeToFrontRecipe} from "./common/commonUtils/EntitieHandeler";

class CardSet extends Component {
  // state
  state = {
    cards: [],
    types: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    //todo get data from back or ls
    if (localStorage.getItem("HomeRecipes") === null) {
      ax.get(cfg.apiUrl + "/recipe/get_selected_recipes",getHeader()).then((res)=>{
        console.log(res);
        if (res.status === 200) {
          toast.success("Password changed");
        } else {
          toast.warning("Password not changed");
        }
        let recipes = []
        res.data.forEach((item, index) => {
          recipes.push(backRecipeToFrontRecipe(item))
        })
      localStorage.setItem("HomeRecipes",JSON.stringify(recipes))
      });
    }
    let cards
    try {
    cards = [...JSON.parse(localStorage.getItem("HomeRecipes"))];
    }catch (e){
      //todo
      cards = [...getFakeCard()]
    }
    this.setState({
      cards,
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleLike = (id) => {
    const tmpCards = [...this.state.cards];
    const newCards = tmpCards.map((card) => {
      if (card.id === id) {
        card.liked = !card.liked;
      }
      return card;
    });
    this.setState({ cards: newCards });
  };

  getPagedData = () => {
    const { pageSize, currentPage, searchQuery, cards: allCards } = this.state;

    let filtered = allCards;
    if (searchQuery)
      filtered = allCards.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else {
      filtered = allCards;
    }
    const cards = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, data: cards };
  };

  render() {
    const { length: count } = this.state.cards;
    const { pageSize, currentPage, searchQuery } = this.state;
    if (count === 0) return <p>There are no recipes in the database.</p>;
    const { totalCount, data: cards } = this.getPagedData();

    return (
      <>
        <NavBar
          searchEnabled={true}
          value={searchQuery}
          onChange={this.handleSearch}
        />
        <div className="container center text-center text-black">
          <p
            className="display-6"
            style={{ fontSize: "25px", marginTop: "60px" }}>
            Found {totalCount} recipes in the database.
          </p>
        </div>
        <div className="container">
          <div className="row m-0  justify-content-around">
            {cards.map((card) => (
              <_Card_ key={card.id} {...card} onLike={this.handleLike} />
            ))}
          </div>
        </div>
        <div className="container center-items centered">
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>

        <Footer />
      </>
    );
  }
}

export default CardSet;
