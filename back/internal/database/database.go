package database

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
	"io/ioutil"
	"time"
)

type config struct {
	Uri            string `json:"uri"`
	DbName         string `json:"dbName"`
	TimeoutSeconds int    `json:"timeoutSeconds"`
}

type Book struct {
	// DefaultModel adds _id, created_at and updated_at fields to the Model
	mgm.DefaultModel `bson:",inline"`
	Name             string   `json:"name" bson:"name"`
	Pages            int      `json:"pages" bson:"pages"`
	Authors          []string `json:"authors" bson:"authors"`
}

func NewBook(name string, pages int, authors []string) *Book {
	return &Book{
		Name:    name,
		Pages:   pages,
		Authors: authors,
	}
}
func (model *Book) CollectionName() string {
	return "test"
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

	//test
	book := NewBook("Pride and Prejudice", 345, []string{"a", "b", "c", "d"})
	// Make sure to pass the model by reference.
	err = mgm.Coll(book).Create(book)
	if err != nil {
		print(err.Error())
	}
	a := book.ID
	print(a.Hex())
}
