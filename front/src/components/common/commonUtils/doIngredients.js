import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doIngredients(
  ingredients,
  isAuthorizedToEdit = false,
  onDeletion = null
) {
  return (
    <>
      <TitleMellow title="Ingredients" />
      {ingredients.map((ingredient) => {
        const { name, quantity, unit } = ingredient;
        return (
          <Tag
            key={ingredient.id}
            isAuthorizedToEdit={isAuthorizedToEdit}
            id={ingredient.id}
            onDeletion={onDeletion}>
            <span>{name + " "}</span>
            <span style={{ fontSize: "12px" }}>{quantity + unit}</span>
          </Tag>
        );
      })}
    </>
  );
}

export default doIngredients;
