import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doIngredients(ingredients) {
  return (
    <>
      <TitleMellow title="Ingredients" />
      {ingredients.map((ingredient) => {
        const { name, quantity, unit } = ingredient;
        return (
          <Tag key={ingredient.id} __id__={ingredient.id}>
            <span>{name + " "}</span>
            <span style={{ fontSize: "12px" }}>{quantity + unit}</span>
          </Tag>
        );
      })}
    </>
  );
}

export default doIngredients;
