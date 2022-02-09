const getFakeCard = () => {
  return [
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
  ];
};

export default getFakeCard;
