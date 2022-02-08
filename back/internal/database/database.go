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
}

func GetUserByUsername(username string) *Entities.User {
	user := &Entities.User{}
	e := mgm.Coll(&Entities.User{}).First(bson.M{"username": username}, user)
	if e != nil {
		print(e.Error())
	}
	return user
}
