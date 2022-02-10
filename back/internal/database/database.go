package database

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"io/ioutil"
	"time"
	"web/project/internal/Entities"
)

type config struct {
	Uri            string `json:"uri"`
	DbName         string `json:"dbName"`
	TimeoutSeconds int    `json:"timeoutSeconds"`
}

func ConnectDB() {
	// load DBconfig
	var config config
	file, _ := ioutil.ReadFile("back/internal/database/config.json")
	err := json.Unmarshal(file, &config)
	if err != nil {
		fmt.Println(err)
		return
	}
	// connect db
	err = mgm.SetDefaultConfig(&mgm.Config{CtxTimeout: time.Duration(config.TimeoutSeconds) * time.Second}, config.DbName, options.Client().ApplyURI(config.Uri))
	if err != nil {
		print(err)
	}

	loadIngredients()
	//test

}

func GetUserByUsername(username string) *Entities.User {
	user := &Entities.User{}
	e := mgm.Coll(&Entities.User{}).First(bson.M{"username": username}, user)
	if e != nil {
		print(e.Error())
	}
	return user
}

func CreateUser(user Entities.User) {
	e := mgm.Coll(&Entities.User{}).Create(&user)
	if e != nil {
		print(e.Error())
	}
}

func AddRecipe(recipe Entities.Recipe) {
	e := mgm.Coll(&Entities.Recipe{}).Create(&recipe)
	if e != nil {
		print(e.Error())
	}
}
func EditRecipe(recipe Entities.Recipe) {
	//r := Entities.Recipe{}
	//r.ID
}
func GetRecipeById(_id string) Entities.Recipe {
	var recipe Entities.Recipe
	err := mgm.Coll(&Entities.Recipe{}).FindByID(_id, &recipe)
	if err != nil {
		print(err.Error())
	}
	// fill ingredients
	for _, recipeIngredient := range recipe.Ingredients {
		recipeIngredient.Ingredient = GetIngredientById(recipeIngredient.IngredientKey)
	}
	// fill tags
	for _, recipeTag := range recipe.Tags {
		recipeTag.Tag = GetTagById(recipeTag.TagId)
	}
	return recipe
}
func GetAllRecipe() []Entities.Recipe {
	var recipes []Entities.Recipe
	err := mgm.Coll(&Entities.Recipe{}).SimpleFind(&recipes, bson.M{})
	if err != nil {
		print(err.Error())
	}
	return recipes
}

func GetIngredientById(_id string) Entities.Ingredient {
	var ingredient Entities.Ingredient
	ingredient = Entities.Ingredients[_id]
	return ingredient
}
func GetTagById(_id string) Entities.Tag {
	var tag Entities.Tag
	tag = Entities.Tags[_id]
	return tag
}
func GetProfileRecipes(_id string) []Entities.MiniRecipe {
	var user Entities.User
	err := mgm.Coll(&Entities.User{}).FindByID(_id, &user)
	if err != nil {
		print(err.Error())
	}
	return user.Recipes
}
func AddCommentToRecipe(recipeId string, comment Entities.Comment) {
	recipe := GetRecipeById(recipeId)
	//todo is add directly to db faster or nah?
	recipe.Comments = append(recipe.Comments, comment)
	err := mgm.Coll(&recipe).Update(&recipe)
	if err != nil {
		print(err.Error())
	}
}

func loadIngredients() {
	var ingredients []Entities.Ingredient
	err := mgm.Coll(&Entities.Ingredient{}).SimpleFind(&ingredients, bson.M{})
	if err != nil {
		print(err.Error())
	}
	for _, ingredient := range ingredients {
		Entities.Ingredients[ingredient.ID.Hex()] = ingredient
	}
}
func loadTags() {
	var tags []Entities.Tag
	err := mgm.Coll(&Entities.Tag{}).SimpleFind(&tags, bson.M{})
	if err != nil {
		print(err.Error())
	}
	for _, tag := range tags {
		Entities.Tags[tag.ID.Hex()] = tag
	}
}
