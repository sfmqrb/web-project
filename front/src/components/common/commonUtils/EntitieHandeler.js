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

export function backProfileToProfile(backProfile) {
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
        name: "ammir",
        avatarURL: "https://unsplash.it/400/600",
        bio: "My hand hurts",
    }
}
export function backProfileToStt(backProfile) {
    return {
        name: backProfile.username
        , email: backProfile.email, bio: backProfile.bio, avatar: backProfile.picturePath,
    }
}