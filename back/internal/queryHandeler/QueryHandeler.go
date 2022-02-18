package queryHandeler

import (
	"back/internal/Entities"
	"back/internal/authentication"
	"back/internal/database"
	"back/internal/tools"
	"errors"
	"github.com/markbates/goth"
	"strings"
)

func HandelLoginQuery(request LoginRequest, sessionLength int) LoginResponse {
	user := database.GetUserByUsername(request.Username)
	response := LoginResponse{}
	if user.Username == "" {
		// no username
		response.NoUsername = true
	} else if tools.ComparePassword(user.Password, request.Password) != nil {
		//wrong password
		response.WrongPass = true
	} else {
		//successful login
		return fillLoginResponse(sessionLength, user)
	}
	return response
}

func GoogleUserToLoginResponse(googleUser goth.User, sessionLength int) LoginResponse {
	username := strings.Split(googleUser.Email, "@")[1]
	pass := username + "googleLogin"
	user := database.GetUserByUsername(username)
	if user.Username == "" {
		//register
		//todo extra step
		return HandleRegisterQuery(RegisterRequest{
			Username: username,
			Password: pass,
			Name:     googleUser.Name,
			Email:    googleUser.Email,
		}, sessionLength)
	} else {
		//login
		return HandelLoginQuery(LoginRequest{
			Username: username,
			Password: pass,
		}, sessionLength)
	}
}
func fillLoginResponse(sessionLength int, user *Entities.User) LoginResponse {
	response := LoginResponse{}
	jwt := authentication.CreateJWT(user.Username, sessionLength)
	response.Image = user.PicturePath
	response.Jwt = jwt
	response.Name = user.Name
	response.Username = user.Username
	response.Bio = user.Bio
	return response
}

func HandleRegisterQuery(request RegisterRequest, sessionLength int) LoginResponse {
	user := database.GetUserByUsername(request.Username)
	response := LoginResponse{}
	if user.Username != "" {
		// no username
		response.NoUsername = true
	} else {
		// create user in db
		user := Entities.User{
			Username:         request.Username,
			Password:         tools.HashPassword(request.Password),
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
		response = fillLoginResponse(sessionLength, &user)
	}
	return response
}
func HandelSendRecipe(recipe Entities.Recipe, username string) {
	recipe.Writer = username
	for i, ingredient := range recipe.Ingredients {
		recipe.Ingredients[i].Ingredient = Entities.Ingredients[ingredient.IngredientKey]
	}
	for i, tag := range recipe.Tags {
		recipe.Tags[i].Tag = Entities.Tags[tag.TagId]
	}
	database.AddRecipe(recipe)
}
func HandelUpdateRecipe(recipe Entities.Recipe, recipeId string, username string) bool {
	recipeCheck := database.GetRecipeById(recipeId)
	if recipeCheck.Writer == username {
		recipe.Writer = recipeCheck.Writer
		recipe.ID = recipeCheck.ID
		recipe.Comments = nil
		database.EditRecipe(recipe)
		// update recipe in user
		user := database.GetUserByUsername(username)
		for i, miniRecipe := range user.Recipes {
			if miniRecipe.MainId == recipeId {
				user.Recipes[i] = Entities.RecipeToMiniRecipe(recipe)
			}
		}
		database.UpdateUser(*user)
		return true
	}
	return false
}
func HandelEditProfile(_username string, editedUser Entities.User) {
	user := database.GetUserByUsername(_username)
	if editedUser.Name != "" {
		user.Name = editedUser.Name
	}
	if editedUser.Bio != "" {
		user.Bio = editedUser.Bio
	}
	if editedUser.PicturePath != "" {
		user.PicturePath = editedUser.PicturePath
	}
	database.UpdateUser(*user)
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
func HandelGetAllIngredients() []Entities.Ingredient {
	ingredients := []Entities.Ingredient{}
	for _, ingredient := range Entities.Ingredients {
		ingredients = append(ingredients, ingredient)
	}
	return ingredients
}

func HandelGetAllTags() []Entities.Tag {
	tags := []Entities.Tag{}
	for _, tag := range Entities.Tags {
		tags = append(tags, tag)
	}
	return tags
}
func HandelGetRecipe(_id string) Entities.Recipe {
	recipe := database.GetRecipeById(_id)
	return recipe
}
func HandelSearchRecipe(req SearchRecipeRequest) []Entities.Recipe {
	return database.SearchRecipe(req.IngsIn, req.IngsOut, req.TagsIn, req.TagsOut, req.OrderBy, req.Ascending,
		req.MinCookingTime, req.MaxCookingTime, req.SearchText)
}
func HandleGetAllRecipe() []Entities.Recipe {
	return database.GetAllRecipe(10)
}
func HandleGetUserRecipes(_id string) []Entities.MiniRecipe {
	return database.GetProfileRecipes(_id)
}
func HandleRecipeComment(recipeId string, comment Entities.Comment, username string) error {
	if comment.User.Username != username {
		return errors.New("userId and comment userId doesnt match")
	}
	comment.User = FillMiniUser(comment.User)
	recipe := database.GetRecipeById(recipeId)
	// recalculate recipe stars
	recipe.Stars = ((float64(len(recipe.Comments)) * recipe.Stars) + comment.Star) / float64(len(recipe.Comments)+1)
	database.AddCommentToRecipe(recipe, comment)
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
func HandelChangePassword(passwordRequest ChangePasswordRequest, _username string) bool {
	user := database.GetUserByUsername(_username)
	e := tools.ComparePassword(user.Password, passwordRequest.OldPassword)
	if e != nil {
		// wrong pass
		return false
	}
	user.Password = tools.HashPassword(passwordRequest.NewPassword)
	database.UpdateUser(*user)
	return true
}
func HandelGetProfile(_reqUserName string, username string) (Entities.User, bool) {
	user := *database.GetUserByUsername(username)
	if user.Username == "" {
		// no uer found
		return user, false
	}
	if _reqUserName == username {
		// get my profile
		user.Password = ""
	}
	// get others profile
	// todo remove some information
	//user.Email = ""
	user.PhoneNumber = ""
	user.Password = ""
	return user, true
}

// HandelFollow todo on db ?
func HandelFollow(_reqUserName string, username string) {
	reqUser := *database.GetUserByUsername(_reqUserName)
	user := *database.GetUserByUsername(username)
	reqUser.Followings = append(reqUser.Followings, username)
	reqUser.Followings = tools.RemoveDuplicateStr(reqUser.Followings)
	user.Followers = append(user.Followers, _reqUserName)
	user.Followers = tools.RemoveDuplicateStr(user.Followers)
	database.UpdateUser(user)
	database.UpdateUser(reqUser)
}

func HandelUnfollow(_reqUserName string, username string) {
	reqUser := *database.GetUserByUsername(_reqUserName)
	user := *database.GetUserByUsername(username)
	reqUser.Followings = removeFromArray(reqUser.Followings, username)
	user.Followers = removeFromArray(user.Followers, _reqUserName)
	database.UpdateUser(user)
	database.UpdateUser(reqUser)
}
func HandelGetFollowers(_username string) []Entities.MiniUser {
	user := database.GetUserByUsername(_username)
	return fillUsernameSlice(user.Followers)
}

func HandelGetFollowings(_username string) []Entities.MiniUser {
	user := database.GetUserByUsername(_username)
	return fillUsernameSlice(user.Followings)
}
func HandelGetUserRecipes(_username string) []Entities.Recipe {
	miniRecipes := database.GetUserByUsername(_username).Recipes
	var recipes []Entities.Recipe
	for i, _ := range miniRecipes {
		r := MiniRecipeToRecipe(miniRecipes[i])
		if r.Name != "" {
			recipes = append(recipes, r)
		}
	}
	return recipes
}
func HandelSaveRecipe(_username string, recipeId string) bool {
	recipe := database.GetRecipeById(recipeId)
	if recipe.Name == "" {
		//wrong recipeId
		return false
	}
	user := database.GetUserByUsername(_username)
	if user.Username == "" {
		//no user
		return false
	}
	user.SavedRecipes = append(user.SavedRecipes, Entities.RecipeToMiniRecipe(recipe))
	database.UpdateUser(*user)
	return true
}
func HandelForgotRecipe(_username string, recipeId string) bool {
	recipe := database.GetRecipeById(recipeId)
	if recipe.Name == "" {
		//wrong recipeId
		return false
	}
	user := database.GetUserByUsername(_username)
	if user.Username == "" {
		//no user
		return false
	}
	user.SavedRecipes = tools.RemoveMiniRecipeFromSlice(user.SavedRecipes, Entities.RecipeToMiniRecipe(recipe))
	database.UpdateUser(*user)
	return true
}
func HandelGetLikedRecipes(_username string) []Entities.Recipe {
	return database.GetCommentedRecipes(*database.GetUserByUsername(_username))
}
func HandelGetSavedRecipes(_username string) []Entities.MiniRecipe {
	user := database.GetUserByUsername(_username)
	return user.Recipes
}

func removeFromArray(slice []string, username string) []string {
	var newReqUserFollowings []string
	for _, following := range slice {
		if following != username {
			newReqUserFollowings = append(newReqUserFollowings, following)
		}
	}
	return newReqUserFollowings
}

func fillUsernameSlice(usernames []string) []Entities.MiniUser {
	miniUsers := []Entities.MiniUser{}
	for _, username := range usernames {
		miniUsers = append(miniUsers, Entities.UserToMiniUser(*database.GetUserByUsername(username)))
	}
	return miniUsers
}
func MiniRecipeToRecipe(miniRecipe Entities.MiniRecipe) Entities.Recipe {
	return database.GetRecipeById(miniRecipe.MainId)
}
