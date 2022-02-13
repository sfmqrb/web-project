package Entities

import (
	"encoding/json"
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

var Tags = make(map[string]Tag)

type User struct {
	mgm.DefaultModel `bson:",inline" json:"model"`
	Username         string `json:"username" bson:"username"`
	// todo hash password
	Password    string `json:"password" bson:"password"`
	Name        string `json:"name" bson:"name"`
	PicturePath string `json:"picturePath" bson:"picturePath"`
	Bio         string `json:"bio" bson:"bio"`
	Email       string `json:"email" bson:"email"`
	PhoneNumber string `json:"phoneNumber" bson:"phoneNumber"`
	Links       []Link `json:"links" bson:"links"`
	//todo is right?
	//list of hex as User Id
	Followers        []string     `json:"followers" bson:"followers"`
	Followings       []string     `json:"followings" bson:"followings"`
	HasMoreFollowers bool         `bson:"hasMoreFollowers" json:"hasMoreFollowers"`
	Recipes          []MiniRecipe `json:"recipes" bson:"recipes"`
}
type MiniUser struct {
	Username    string `json:"username" bson:"username"`
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
	Tags           []RecipeTag        `json:"tags" bson:"tags"`
	Writer         string             `bson:"writer" json:"writer"`
	Comments       []Comment          `json:"comments,omitempty" bson:"comments,omitempty"`
	HasMoreComment bool               `json:"hasMoreComment" bson:"hasMoreComment"`
	Stars          float64            `bson:"stars" json:"stars"`
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
	Volume        float64    `json:"volume" bson:"volume"`
	Ingredient    Ingredient `json:"ingredient"`
}
type RecipeTag struct {
	TagId string `json:"tagId" bson:"tagId"`
	Tag   Tag    `json:"tag"`
}
type Comment struct {
	User MiniUser `json:"user" bson:"user"`
	Text string   `json:"text" bson:"text"`
	Star float64  `json:"star" bson:"star"`
}

func RecipeToMiniRecipe(recipe Recipe) MiniRecipe {
	return MiniRecipe{
		MainId:      recipe.ID.Hex(),
		Name:        recipe.Name,
		ImagePath:   recipe.ImagePath,
		CookingTime: recipe.CookingTime,
	}
}
func UserToMiniUser(user User) MiniUser {
	return MiniUser{
		Username:    user.Username,
		Name:        user.Name,
		PicturePath: user.PicturePath,
	}
}

func test() {
	recipe := Recipe{
		Name:        "omelet",
		ImagePath:   "",
		Steps:       []Step{{Text: "put oil in pan"}, {Text: "lfakjfl"}},
		Type:        "breakfast",
		Nationality: "iran",
		CookingTime: 5,
		Ingredients: []RecipeIngredient{{
			IngredientKey: "egg",
			Volume:        100,
		}},
		Tags: []RecipeTag{{
			TagId: "id",
		}},
		Writer: "username",
		Comments: []Comment{{
			User: MiniUser{
				Username:    "moNamdar",
				Name:        "mohammad namdar",
				PicturePath: "",
			},
			Text: "fsa;lfk",
			Star: 3,
		}},
		HasMoreComment: false,
		Stars:          3,
		Views:          2,
	}
	user := User{
		Username:    "amm",
		Password:    "Xamm2666",
		Name:        "amir",
		PicturePath: "",
		Bio:         "a good guy",
		Email:       "a.m.mohammadi266@gmail.com",
		PhoneNumber: "09031595318",
		Links: []Link{{
			Title: "Telegram",
			URL:   "https://t.me/amm266",
		}},
		Followers:        []string{"amir", "hassan"},
		Followings:       []string{},
		HasMoreFollowers: false,
		Recipes: []MiniRecipe{{
			MainId:      "omelet",
			Name:        "omelet",
			ImagePath:   "",
			CookingTime: 5,
		}},
	}
	bytes, err := json.Marshal(user)
	if err != nil {
		return
	}
	jsonString := string(bytes)
	print(jsonString)
	bytes, err = json.Marshal(recipe)
	if err != nil {
		return
	}
	jsonString = string(bytes)
}
