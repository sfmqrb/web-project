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

func CreateRecipe(recipe Entities.Recipe) {
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
	return recipe
}

func GetIngredientById(_id string) Entities.Ingredient {
	var ingredient Entities.Ingredient
	ingredient = Entities.Ingredients[_id]
	return ingredient
}
func loadIngredients() {
	ingredients := []Entities.Ingredient{}
	err := mgm.Coll(&Entities.Ingredient{}).SimpleFind(&ingredients, bson.M{})
	if err != nil {
		print(err.Error())
	}
	for _, ingredient := range ingredients {
		Entities.Ingredients[ingredient.ID.Hex()] = ingredient
	}
}
