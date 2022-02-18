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
        writer: backRecipe.writer,
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
        tagId: backTag.tagId,
        name: backTag.tag.name,
    }
}

export function backFoodIngToFoodIngredient(backIng) {
    return {
        ingredientKey: backIng.ingredientKey,
        name: backIng.ingredient.name,
        quantity: backIng.volume,
        unit: backIng.ingredient.unit
    }
}

export function backProfileToProfile(backProfile) {
    console.log(JSON.stringify(backProfile))
    return {
        id: backProfile.model.id,
        password: "",
        email: backProfile.email,
        name: backProfile.username,
        bio: backProfile.bio,
        avatarUrl: backProfile.picturePath,
    };
    // return {
    //     id: "1",
    //     password: "helloworld",
    //     email: "foo@example.com",
    //     name: "John Doe",
    //     bio: "Life is short and I like pizza",
    //     avatarUrl: "http://www.fillmurray.com/200/200",
    // };

}

export function backProfileToUserInfo(backProfile) {
    return {
        id: backProfile.model.id,
        name: backProfile.username,
        avatarURL: backProfile.picturePath,
        bio: backProfile.bio,
    }
}
export function backProfileToStt(backProfile) {
    return {
        name: backProfile.username
        , email: backProfile.email, bio: backProfile.bio, avatar: backProfile.picturePath,
    }
}
export function tagsToKeyArray(tags){
    let arr = []
    tags.forEach((item, index) => {
        arr.push(item.tagId)
    })
    return arr
}

export function ingredientsToKeyArray(tags){
    let arr = []
    tags.forEach((item, index) => {
        arr.push(item.ingredientKey)
    })
    return arr
}