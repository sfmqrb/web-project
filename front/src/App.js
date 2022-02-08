import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import CardSet from "./components/cardSet";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  // const tags = ["ab", "ba", "cd", "de", "ge", "hi"];

  const cards = [
    {
      id: 1,
      title: "Card 1",
      name: "Card 1",
      subheader: "Card 1",
      image: "https://source.unsplash.com/random",
      body: "Card 1",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      id: 2,
      title: "Card 2",
      name: "Card 2",
      subheader: "Card 2",
      image: "https://source.unsplash.com/random",
      body: "Card 2",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      id: 3,
      title: "Card 3",
      name: "Card 3",
      subheader: "Card 3",
      image: "https://source.unsplash.com/random",
      body: "Card 3",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      id: 4,
      title: "Card 4",
      name: "Card 4",
      subheader: "Card 4",
      image: "https://source.unsplash.com/random",
      body: "Card 4",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
  ];

  return (
    // <div className="App">
    //   <_Card_
    //     profile_name="SF"
    //     title="FOOD TITLE"
    //     subheader="FOOD SUBHEADER"
    //     body="BOOOOOOOODY BOOOOOOOODY BOOOOOOOODY BOOOOOOOODY BOOOOOOOODY BOOOOOOOODY"
    //     tags={tags}
    //     image="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    //   />
    // </div>

    // <RegisterForm />
    // <div></div>
    <CardSet cards={cards} />
  );
}

export default App;
