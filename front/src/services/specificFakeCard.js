import getFakeCard from "./fakeCard";

const getSpecificFakeCard = (_id) => {
  const cards = [...getFakeCard()];
  const card = cards.find((card) => card._id.toString() === _id.toString());
  return card;
};

export default getSpecificFakeCard;
