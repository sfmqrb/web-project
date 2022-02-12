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

func HandleRegisterQuery(request RegisterRequest, sessionLength int) LoginResponse {
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
func HandelSearchRecipe(req SearchRecipeRequest) []Entities.Recipe {
	return database.SearchRecipe(req.IngsIn, req.IngsOut, req.TagsIn, req.TagsOut)
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
func HandelGetProfile(_reqUserName string, username string) (Entities.User, bool) {
	user := *database.GetUserByUsername(username)
	if user.Username == "" {
		// no uer found
		return user, false
	}
	if _reqUserName == username {
		// get my profile
		// todo remove some information
		user.Email = ""
		user.PhoneNumber = ""
		user.Password = ""
	}
	// get others profile
	user.Password = ""
	return user, true
}

// HandelFollow todo on db ?
func HandelFollow(_reqUserName string, username string) {
	reqUser := *database.GetUserByUsername(_reqUserName)
	user := *database.GetUserByUsername(username)
	reqUser.Followings = append(reqUser.Followings, username)
	user.Followers = append(user.Followers, _reqUserName)
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
