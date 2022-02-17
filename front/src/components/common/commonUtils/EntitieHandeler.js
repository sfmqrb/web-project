export function backRecipeToFrontRecipe(backRecipe) {
    let steps = []
    backRecipe.steps.forEach((item, index) => {
        steps.push(item.text)
    })
    let tags = []
    backRecipe.tags.forEach((item, index) => {
        tags.push(backTagToTag(item))
    })
    let ingredients = []
    backRecipe.ingredients.forEach((item, index) => {
        ingredients.push(backFoodIngToFoodIngredient(item))
    })
    return {
        images: [backRecipe.imagePath],
        steps: steps,
        name: backRecipe.writer,
        id: backRecipe.model.id,
        title: backRecipe.name,
        //todo
        subheader: "",
        body: backRecipe.body,
        type: backRecipe.type,
        nationality: backRecipe.nationality,
        tags: tags,
        ingredients: ingredients,
        liked: false,
    }
}

export function backTagToTag(backTag) {
    return {
        id: backTag.tagId,
        name: backTag.tag.name,
    }
}

export function backFoodIngToFoodIngredient(backIng) {
    return {
        id: backIng.ingredientKey,
        name: backIng.ingredient.name,
        quantity: backIng.volume,
        unit: backIng.ingredient.unit
    }
}