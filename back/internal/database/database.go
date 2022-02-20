package database

import (
	"back/internal/Entities"
	cache "back/internal/cache"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"time"

	"github.com/kamva/mgm/v3"
	"github.com/kamva/mgm/v3/operator"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	mgo "gopkg.in/mgo.v2"
)

var cache_session = initMongoCache()
var mongoCache = cache.NewMongoCacheWithTTL(cache_session, cache.StartGC())

type Test struct {
	mgm.DefaultModel `bson:",inline" json:"model"`
	A                string `bson:"a" json:"a"`
	B                string `bson:"b,omitempty" json:"b,omitempty"`
}

type config struct {
	Uri            string `json:"uri"`
	DbName         string `json:"dbName"`
	TimeoutSeconds int    `json:"timeoutSeconds"`
}

func ConnectDB() {
	// load DBConfig
	var config config
	file, _ := ioutil.ReadFile("internal/database/config.json")
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
	loadTags()
	defer mongoCache.StopGC()

}

func GetUserByUsername(username string) *Entities.User {
	data, err := mongoCache.Get(username)
	user := &Entities.User{}
	if err == nil {
		if err := json.Unmarshal(data.([]byte), user); err != nil {
			print(err.Error())
		}
		//todo
		fmt.Println("get user from cache")
		mongoCache.Set(username, data)
	} else {
		fmt.Println("miss cache user")
		e := mgm.Coll(&Entities.User{}).First(bson.M{"username": username}, user)
		if e != nil {
			print(e.Error())
		}
		key := username
		value, err := json.Marshal(*user)
		if err != nil {
			print(err.Error())
		}
		mongoCache.Set(key, value)
	}
	return user
}

func CreateUser(user Entities.User) {
	e := mgm.Coll(&Entities.User{}).Create(&user)
	if e != nil {
		print(e.Error())
	}
}

func UpdateUser(user Entities.User) {
	value, err := json.Marshal(user)
	if err != nil {
		print(err.Error())
	}
	err = mongoCache.Set(user.Username, value)
	if err != nil {
		print(err.Error())
	}
	_ = mgm.Coll(&user).Update(&user)
}

func GetCommentedRecipes(user Entities.User) []Entities.Recipe {
	var recipes = []Entities.Recipe{}
	e := mgm.Coll(&Entities.Recipe{}).SimpleFind(&recipes, bson.M{"comments.user.username": user.Username})
	if e != nil {
		print(e.Error())
	}
	return recipes
}
func AddRecipe(recipe Entities.Recipe) {
	e := mgm.Coll(&Entities.Recipe{}).Create(&recipe)
	if e != nil {
		print(e.Error())
		return
	}
	user := GetUserByUsername(recipe.Writer)
	//todo add directly
	user.Recipes = append(user.Recipes, Entities.RecipeToMiniRecipe(recipe))
	err := mgm.Coll(user).Update(user)
	if err != nil {
		return
	}
}
func GetRecipeById(_id string) Entities.Recipe {
	var recipe Entities.Recipe
	err := mgm.Coll(&Entities.Recipe{}).FindByID(_id, &recipe)
	if err != nil {
		print(err.Error())
		//todo handel no recipe
	}
	// fill ingredients
	for i, _ := range recipe.Ingredients {
		recipe.Ingredients[i].Ingredient = GetIngredientById(recipe.Ingredients[i].IngredientKey)
	}
	// fill tags
	for i, _ := range recipe.Tags {
		recipe.Tags[i].Tag = GetTagById(recipe.Tags[i].TagId)
	}
	return recipe
}
func GetAllRecipe(limitNumber int64) []Entities.Recipe {
	var recipes []Entities.Recipe
	err := mgm.Coll(&Entities.Recipe{}).SimpleFind(&recipes, bson.M{}, &options.FindOptions{Limit: &limitNumber})
	if err != nil {
		print(err.Error())
	}
	return recipes
}
func DelRecipe(recipe Entities.Recipe) bool {
	err := mgm.Coll(&recipe).Delete(&recipe)
	if err != nil {
		return false
	}
	return true
}
func EditRecipe(recipe Entities.Recipe) bool {
	err := mgm.Coll(&recipe).Update(&recipe)
	if err != nil {
		return true
	}
	return false
}
func SearchRecipe(ingsIn []string, ingsOut []string, tagsIn []string, tagsOut []string, orderBy string, ascending bool,
	minCookingTime int, maxCookingTime int, textSearch string) []Entities.Recipe {
	var recipes = []Entities.Recipe{}
	filter := bson.M{}
	allIngsM := operator.All
	if len(ingsIn) == 0 {
		allIngsM = operator.Nin
	}
	allTagsM := operator.All
	if len(tagsIn) == 0 {
		allTagsM = operator.Nin
	}
	if maxCookingTime == 0 {
		maxCookingTime = 10000
	}
	var textFilter bson.M
	if textSearch == "" {
		filter = bson.M{"ingredients.ingredientKey": bson.M{allIngsM: ingsIn, operator.Nin: ingsOut}, "tags.tagId": bson.M{allTagsM: tagsIn, operator.Nin: tagsOut}}
	} else {
		textFilter = bson.M{"$search": textSearch}
		filter = bson.M{"ingredients.ingredientKey": bson.M{allIngsM: ingsIn, operator.Nin: ingsOut}, "tags.tagId": bson.M{allTagsM: tagsIn, operator.Nin: tagsOut},
			operator.Text: textFilter}
	}

	var orderOption options.FindOptions
	if ascending {
		orderOption = options.FindOptions{Sort: bson.M{orderBy: 1}}
	} else {
		orderOption = options.FindOptions{Sort: bson.M{orderBy: -1}}
	}
	e := mgm.Coll(&Entities.Recipe{}).SimpleFind(&recipes, filter, &orderOption)

	if e != nil {
		print(e.Error())
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
func AddCommentToRecipe(recipe Entities.Recipe, comment Entities.Comment) {
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
	print("1")
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
