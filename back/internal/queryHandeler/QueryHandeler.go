package queryHandeler

import (
	"errors"
	"web/project/internal/Entities"
	"web/project/internal/authentication"
	"web/project/internal/database"
)

func HandelLoginQuery(request LoginRequest, sessionLength int) LoginResponse {
	user := database.GetUserByUsername(request.Username)
	response := LoginResponse{}
	if user.Username == "" {
		// no username
		response.NoUsername = true
	} else if user.Password != request.Password {
		//wrong password
		response.WrongPass = true
	} else {
		//successful login
		fillLoginResponse(sessionLength, response, user)
	}
	return response
}

func fillLoginResponse(sessionLength int, response LoginResponse, user *Entities.User) {
	jwt := authentication.CreateJWT(user.Username, sessionLength)
	response.Jwt = jwt
	response.Name = user.Name
	response.Username = user.Username
	response.Bio = user.Bio
}

func HandleCreateUserQuery(request CreateUserRequest, sessionLength int) LoginResponse {
	user := database.GetUserByUsername(request.Username)
	response := LoginResponse{}
	if user.Username == "" {
		// no username
		response.NoUsername = true
	} else {
		// create user in db
		user := Entities.User{
			Username:         request.Username,
			Password:         request.Password,
			Name:             request.Name,
			PicturePath:      "",
			Bio:              "",
			Email:            "",
			PhoneNumber:      "",
			Links:            []Entities.Link{},
			Followers:        []string{},
			Followings:       []string{},
			HasMoreFollowers: false,
			Recipes:          []Entities.MiniRecipe{},
		}
		//save id db
		database.CreateUser(user)
		fillLoginResponse(sessionLength, response, &user)
	}
	return response
}
func HandelSendRecipe(recipe Entities.Recipe, username string) {
	recipe.Writer = username
	database.AddRecipe(recipe)
}
func HandelUpdateRecipe(recipeId string, username string) bool {
	recipe := database.GetRecipeById(recipeId)
	if recipe.Writer == username {
		database.EditRecipe(recipe)
		return true
	}
	return false
}
func HandelDelRecipe(recipeId string, username string) bool {
	recipe := database.GetRecipeById(recipeId)
	if recipe.Writer == username {
		database.DelRecipe(recipe)
		return true
	}
	return false
}
func HandelGetIngredient(_id string) Entities.Ingredient {
	ingredient := database.GetIngredientById(_id)
	return ingredient
}
func HandelGetRecipe(_id string) Entities.Recipe {
	recipe := database.GetRecipeById(_id)
	return recipe
}
func HandleGetAllRecipe() []Entities.Recipe {
	return database.GetAllRecipe()
}
func HandleGetUserRecipes(_id string) []Entities.MiniRecipe {
	return database.GetProfileRecipes(_id)
}
func HandleRecipeComment(recipeId string, comment Entities.Comment, username string) error {
	if comment.User.Username != username {
		return errors.New("userId and comment userId doesnt match")
	}
	comment.User = FillMiniUser(comment.User)
	database.AddCommentToRecipe(recipeId, comment)
	return nil
}
func HandleGetTag(_id string) Entities.Tag {
	var tag Entities.Tag
	tag = database.GetTagById(_id)
	return tag
}

func FillMiniUser(miniUser Entities.MiniUser) Entities.MiniUser {
	user := database.GetUserByUsername(miniUser.Username)
	miniUser.Name = user.Name
	miniUser.PicturePath = user.PicturePath
	return miniUser
}
