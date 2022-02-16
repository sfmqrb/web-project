import getFakeCard from "./fakeCard";

const getSpecificFakeCard = (id) => {
  const cards = [...getFakeCard()];
  const card = cards.find((card) => card.id.toString() === id.toString());
  return card;
};

export default getSpecificFakeCard;
