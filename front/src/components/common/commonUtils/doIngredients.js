import Tag from "../Tag/tag";
import TitleMellow from "../Titles/titleMellow";

function doIngredients(
    ingredients,
    isAuthorizedToEdit = false,
    onDeletion = null,
    title
) {
    title = title || "Ingredients"
    console.log("do ingredient title  ", title)
    console.log("ing    ",ingredients)
    return (
        <>
            <TitleMellow title={title}/>
            {ingredients.map((ingredient) => {
                let {name, quantity, unit} = ingredient;
                if(!quantity){
                    quantity = ingredient.volume
                }
                return (
                    <Tag
                        key={ingredient.ingredientKey}
                        isAuthorizedToEdit={isAuthorizedToEdit}
                        id={ingredient.ingredientKey}
                        onDeletion={onDeletion}>
                        <span>{name + " "}</span>
                        <span style={{ fontSize: "12px" }}>{quantity + " " + unit}</span>
                    </Tag>
                );
            })}
        </>
    );
}

export default doIngredients;
