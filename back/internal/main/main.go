package main

import (
	"back/internal/Entities"
	. "back/internal/cache"
	"fmt"
	"os"

	mgo "gopkg.in/mgo.v2"
)

// can change the name to session later
var cache_session = initMongoCache()

func initMongoCache() *mgo.Session {
	mongoURI := os.Getenv("MONGODB_URL")
	if mongoURI == "" {
		mongoURI = "127.0.0.1:27017/cache"
	}

	ses, err := mgo.Dial(mongoURI)
	if err != nil {
		panic(err)
	}

	ses.SetSafe(&mgo.Safe{})

	return ses
}

func main() {
	// dataTTL and GCInterval can be customized
	mongoCache := NewMongoCacheWithTTL(cache_session, StartGC())

	defer mongoCache.StopGC()

	key := "amm"
	value := Entities.User{
		Username:    "amm",
		Password:    "Xamm2666",
		Name:        "amir",
		PicturePath: "",
		Bio:         "a good boy",
		Email:       "a.m.mohammadi266@gmail.com",
		PhoneNumber: "09031595318",
		Links: []Entities.Link{{Title: "Telegram",
			URL: "https://t.me/amm266"},
			{Title: "LinkIn",
				URL: "https://www.linkedin.com"}},
		Followers:        []string{"amir karimi", "hassan javad"},
		Followings:       []string{"jafar"},
		HasMoreFollowers: false,
		Recipes: []Entities.MiniRecipe{{MainId: "omelet",
			Name:        "omeletID",
			ImagePath:   "",
			CookingTime: 5}},
		SavedRecipes: []Entities.MiniRecipe{},
	}

	err := mongoCache.Set(key, value)
	if err != nil {
		fmt.Println(err)
	}

	data, err2 := mongoCache.Get(key)
	if err2 != nil {
		fmt.Println(err2)
	} // else if data != value {
	fmt.Printf("\n")
	fmt.Println(data)
	fmt.Printf("\n\n\n")
	fmt.Println(value)
	fmt.Printf("\n")
}

func printInfo(data interface{}) {
	fmt.Println(data.name, data.bio)
}
