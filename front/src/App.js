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
      _id: 1,
      title: "title :: Card 1",
      name: "name :: Card 1",
      subheader: "subheader Card 1",
      image: "https://unsplash.it/400/300",
      body: "body :: Card 1",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      _id: 2,
      title: "title :: Card 2",
      name: "name :: Card 2",
      subheader: "subheader Card 2",
      image: "https://unsplash.it/400/600",
      body: "body :: Card 2",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      _id: 3,
      title: "title :: Card 3",
      name: "name :: Card 3",
      subheader: "subheader Card 3",
      image: "https://source.unsplash.com/random",
      body: "body :: Card 3",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      _id: 4,
      title: "title :: Card 4",
      name: "name :: Card 4",
      subheader: "subheader Card 4",
      image: "https://source.unsplash.com/random",
      body: "body :: Card 4",
      tags: ["ab", "ba", "cd", "de", "ge", "hi"],
    },
    {
      _id: 5,
      title: "title :: Card 5",
      name: "name :: Card 5",
      subheader: "subheader Card 5",
      image: "https://source.unsplash.com/random",
      body: "body :: Card 5",
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
