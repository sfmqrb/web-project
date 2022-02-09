package database

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

	r := Entities.Recipe{
		DefaultModel:   mgm.DefaultModel{},
		Name:           "",
		ImagePath:      "",
		Steps:          nil,
		Type:           "",
		Nationality:    "",
		CookingTime:    0,
		Ingredients:    nil,
		Tags:           nil,
		Writer:         "",
		Comments:       nil,
		HasMoreComment: false,
		Stars:          0,
		Views:          0,
	}
	r.ID = primitive.ObjectID{}
	x, _ := json.Marshal(r)
	print(string(x))
	js := "{\"model\":{\"id\":\"123456789101112130000000\",\"created_at\":\"0001-01-01T00:00:00Z\",\"updated_at\":\"0001-01-01T00:00:00Z\"},\"name\":\"\",\"imagePath\":\"\",\"steps\":null,\"type\":\"\",\"nationality\":\"\",\"cookingTime\":0,\"ingredients\":\nnull,\"tags\":null,\"writer\":\"\",\"comments\":null,\"hasMoreComment\":false,\"stars\":0,\"views\":0}\n"
	_ = json.Unmarshal([]byte(js), &r)
	print(1)
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

func GetIngredientById(_id string) Entities.Ingredient {
	var ingredient Entities.Ingredient
	err := mgm.Coll(&Entities.Ingredient{}).FindByID(_id, &ingredient)
	if err != nil {
		return Entities.Ingredient{}
	}
	return ingredient
}
