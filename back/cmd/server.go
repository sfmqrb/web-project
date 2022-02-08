package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"web/project/internal/database"
)

type Config struct {
	Port           string `json:"port"`
	SessionLimit   int    `json:"sessionLimit"`
	MinuteTryLimit int    `json:"minuteTryLimit"`
}

var config Config

func main() {
	preLoad()
	http.HandleFunc("/", HandleRequest)
	log.Fatal(http.ListenAndServe(":"+config.Port, nil))
}

func HandleRequest(responseWriter http.ResponseWriter, request *http.Request) {
	// todo add cros headers
	// todo add option request OK handle

}

func preLoad() {
	database.ConnectDB()
	file, _ := ioutil.ReadFile("back/cmd/config.json")
	err := json.Unmarshal(file, &config)
	if err != nil {
		fmt.Println(err)
		return
	}
}
