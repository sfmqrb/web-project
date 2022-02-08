package Entities

import (
	"github.com/kamva/mgm/v3"
)

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string `json:"name" bson:"name"`
	PicturePath      string `json:"picturePath" bson:"picturePath"`
	Bio              string `json:"bio" bson:"bio"`
	Email            string `json:"email" bson:"email"`
	PhoneNumber      string `json:"phoneNumber" bson:"phoneNumber"`
	Links            Link[] `json:"links" bson:"links"`
	//todo is right?
	//list of hex as User Id
	Followers        string[]     `json:"followers" bson:"followers"`
	Followings       string[]     `json:"followings" bson:"followings"`
	HasMoreFollowers bool         `bson:"hasMoreFollowers" json:"hasMoreFollowers"`
	Recipes          MiniRecipe[] `json:"recipes" bson:"recipes"`
}
type MiniRecipe struct {
	MainId      string[] `json:"mainId" bson:"mainId"`
	Name        string   `json:"name" bson:"name"`
	ImagePath   string   `json:"imagePath" bson:"imagePath"`
	CookingTime int      `json:"cookingTime" bson:"cookingTime"`
}

type Link struct {
	Title string `json:"title" bson:"title"`
	URL   string `json:"url" bson:"url"`
}
