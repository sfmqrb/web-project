package Entities

import (
	"github.com/kamva/mgm/v3"
)

const ()

type Ingredient struct {
	mgm.DefaultModel `bson:",inline" json:"model"`
	Name             string `json:"name" bson:"name"`
	ImagePath        string `json:"imagePath" bson:"imagePath"`
	Type             string `json:"type" bson:"type"`
	//todo enum
	Unit    string  `json:"unit" bson:"unit"`
	Serving float64 `json:"serving" bson:"serving"`
	Energy  float64 `json:"energy" bson:"energy"`
	Protein float64 `json:"protein" bson:"protein"`
	Carbs   float64 `json:"carbs" bson:"carbs"`
	Fat     float64 `json:"fat" bson:"fat"`
	Details string  `bson:"details" json:"details"`
}

var Ingredients = make(map[string]Ingredient)

type Tag struct {
	mgm.DefaultModel `bson:",inline" json:"model"`
	Name             string `json:"name" bson:"name"`
	ImagePath        string `json:"imagePath" bson:"imagePath"`
	Type             string `json:"type" bson:"type"`
	Details          string `bson:"details" json:"details"`
}
type User struct {
	mgm.DefaultModel `bson:",inline" json:"model"`
	Username         string `json:"username" bson:"username"`
	Password         string `json:"password" bson:"password"`
	Name             string `json:"name" bson:"name"`
	PicturePath      string `json:"picturePath" bson:"picturePath"`
	Bio              string `json:"bio" bson:"bio"`
	Email            string `json:"email" bson:"email"`
	PhoneNumber      string `json:"phoneNumber" bson:"phoneNumber"`
	Links            []Link `json:"links" bson:"links"`
	//todo is right?
	//list of hex as User Id
	Followers        []string     `json:"followers" bson:"followers"`
	Followings       []string     `json:"followings" bson:"followings"`
	HasMoreFollowers bool         `bson:"hasMoreFollowers" json:"hasMoreFollowers"`
	Recipes          []MiniRecipe `json:"recipes" bson:"recipes"`
}
type MiniUser struct {
	Name        string `json:"name" bson:"name"`
	PicturePath string `json:"picturePath" bson:"picturePath"`
}
type Link struct {
	Title string `json:"title" bson:"title"`
	URL   string `json:"url" bson:"url"`
}

type Recipe struct {
	mgm.DefaultModel `bson:",inline" json:"model"`
	Name             string `json:"name" bson:"name"`
	ImagePath        string `json:"imagePath" bson:"imagePath"`
	Steps            []Step `json:"steps" bson:"steps"`
	// todo enum
	Type           string             `json:"type" bson:"type"`
	Nationality    string             `bson:"nationality" json:"nationality"`
	CookingTime    int                `json:"cookingTime" bson:"cookingTime"`
	Ingredients    []RecipeIngredient `json:"ingredients" bson:"ingredients"`
	Tags           []string           `json:"tags" bson:"tags"`
	Writer         string             `bson:"writer" json:"writer"`
	Comments       []Comment          `json:"comments" bson:"comments"`
	HasMoreComment bool               `json:"hasMoreComment" bson:"hasMoreComment"`
	Stars          float32            `bson:"stars" json:"stars"`
	Views          int                `json:"views" bson:"views"`
}
type MiniRecipe struct {
	MainId      string `json:"mainId" bson:"mainId"`
	Name        string `json:"name" bson:"name"`
	ImagePath   string `json:"imagePath" bson:"imagePath"`
	CookingTime int    `json:"cookingTime" bson:"cookingTime"`
}
type Step struct {
	Text string `json:"text" bson:"text"`
}
type RecipeIngredient struct {
	IngredientKey string     `json:"ingredientKey" bson:"ingredientKey"`
	Volume        float32    `json:"volume" bson:"volume"`
	Ingredient    Ingredient `bson:"ingredient" json:"ingredient"`
}
type Comment struct {
	User MiniUser `json:"user" bson:"user"`
	Text string   `json:"text" bson:"text"`
	Star float32  `json:"star" bson:"star"`
}
