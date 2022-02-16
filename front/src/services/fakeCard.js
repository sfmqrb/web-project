const getFakeCard = () => {
  return [
    {
      images: ["https://unsplash.it/400/600", "https://unsplash.it/400/600"],
      steps: ["body :: Card 1", "body :: Card 1", "body :: Card 1"],
      name: "John Doe",
      id: 1,
      title: "title :: Card 1",
      subheader: "subheader Card 1",
      body: "body :: Card 1",
      tags: [
        {
          id: "tag1",
          name: "tag1",
        },
        {
          id: "tag2",
          name: "tag2",
        },
      ],
      ingredients: [
        { id: 1, name: "egg", quantity: 1, unit: "g" },
        { id: 2, name: "nut", quantity: 10, unit: "" },
      ],
      liked: false,
    },
    {
      name: "John Doe",
      images: ["https://unsplash.it/400/600", "https://unsplash.it/400/600"],
      steps: ["body :: Card 1", "body :: Card 1", "body :: Card 1"],
      id: 2,
      title: "title :: Card 2",
      subheader: "subheader Card 2",
      body: "body :: Card 2",
      tags: [
        {
          id: "tag1",
          name: "tag1",
        },
        {
          id: "tag2",
          name: "tag2",
        },
      ],
      ingredients: [
        { id: 1, name: "egg", quantity: 1, unit: "g" },
        { id: 2, name: "nut", quantity: 10, unit: "" },
      ],
      liked: false,
    },
    {
      name: "Bond Doe",
      images: ["https://unsplash.it/400/600", "https://unsplash.it/400/600"],
      steps: ["body :: Card 1", "body :: Card 1", "body :: Card 1"],
      id: 3,
      title: "title :: Card 3",
      subheader: "subheader Card 3",
      body: "body :: Card 3",
      tags: [
        {
          id: "tag1",
          name: "tag1",
        },
        {
          id: "tag2",
          name: "tag2",
        },
      ],
      ingredients: [
        { id: 1, name: "egg", quantity: 1, unit: "g" },
        { id: 2, name: "nut", quantity: 10, unit: "" },
      ],
      liked: true,
    },
    {
      name: "Doe",

      images: ["https://unsplash.it/400/600", "https://unsplash.it/400/600"],
      steps: ["body :: Card 1", "body :: Card 1", "body :: Card 1"],
      id: 4,
      title: "title :: Card 4",
      subheader: "subheader Card 4",
      body: "body :: Card 4",
      tags: [
        {
          id: "tag1",
          name: "tag1",
        },
        {
          id: "tag2",
          name: "tag2",
        },
      ],
      ingredients: [
        { id: 1, name: "egg", quantity: 1, unit: "g" },
        { id: 2, name: "nut", quantity: 10, unit: "" },
      ],
      liked: true,
    },
    {
      name: "John Doe",
      images: ["https://unsplash.it/400/600", "https://unsplash.it/400/600"],
      steps: ["body :: Card 1", "body :: Card 1", "body :: Card 1"],
      id: 5,
      title: "title :: Card 5",
      subheader: "subheader Card 5",
      body: "body :: Card 5",
      tags: [
        {
          id: "tag1",
          name: "tag1",
        },
        {
          id: "tag2",
          name: "tag2",
        },
      ],
      ingredients: [
        { id: 1, name: "egg", quantity: 1, unit: "g" },
        { id: 2, name: "nut", quantity: 10, unit: "" },
      ],
      liked: true,
    },
    {
      name: "Doe",
      images: ["https://unsplash.it/400/600", "https://unsplash.it/400/600"],
      steps: ["body :: Card 1", "body :: Card 1", "body :: Card 1"],
      id: 6,
      title: "title :: Card 6",
      subheader: "subheader Card 6",
      body: "body :: Card 6",
      tags: [
        {
          id: "tag1",
          name: "tag1",
        },
        {
          id: "tag2",
          name: "tag2",
        },
      ],
      ingredients: [
        { id: 1, name: "egg", quantity: 1, unit: "g" },
        { id: 2, name: "nut", quantity: 10, unit: "" },
      ],
      liked: false,
    },
  ];
};

export default getFakeCard;
