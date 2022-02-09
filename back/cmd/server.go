package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"web/project/internal/database"
	"web/project/internal/queryHandeler"
)

type Config struct {
	Port           string `json:"port"`
	SessionLimit   int    `json:"sessionLimit"`
	MinuteTryLimit int    `json:"minuteTryLimit"`
}

var ConfigData Config

func main() {
	preLoad()
	http.HandleFunc("/", HandleRequest)
	log.Fatal(http.ListenAndServe(":"+ConfigData.Port, nil))
}

func HandleRequest(responseWriter http.ResponseWriter, request *http.Request) {
	// todo add cros headers
	// todo add option request OK handle
	urlList := strings.Split(request.URL.Path, "/")
	switch urlList[1] {
	case "login":
		loginRequest := queryHandeler.LoginRequest{}
		err := json.Unmarshal([]byte(getRequestBody(request)), &loginRequest)
		if err != nil {
			responseWriter.WriteHeader(http.StatusBadRequest)
			return
		}
		loginResponse := queryHandeler.HandelLoginQuery(loginRequest, ConfigData.SessionLimit)
		sendResponseJson(responseWriter, loginResponse)
		if loginResponse.NoUsername || loginResponse.WrongPass {
			responseWriter.WriteHeader(http.StatusUnauthorized)
		} else {
			responseWriter.WriteHeader(http.StatusOK)
		}
	case "create_user":
		createUserRequest := queryHandeler.CreateUserRequest{}
		err := json.Unmarshal([]byte(getRequestBody(request)), &createUserRequest)
		if err != nil {
			responseWriter.WriteHeader(http.StatusBadRequest)
			return
		}
		loginResponse := queryHandeler.HandleCreateUserQuery(createUserRequest, ConfigData.SessionLimit)
		sendResponseJson(responseWriter, loginResponse)
		if loginResponse.NoUsername {
			responseWriter.WriteHeader(http.StatusConflict)
		} else {
			responseWriter.WriteHeader(http.StatusOK)
		}
	case "ingredient":
		ingredient := queryHandeler.HandelGetIngredient(urlList[2])
		sendResponseJson(responseWriter, ingredient)
	case "recipe":
		recipe := queryHandeler.HandelGetRecipe(urlList[2])
		sendResponseJson(responseWriter, recipe)
	}
}

func preLoad() {
	database.ConnectDB()
	file, _ := ioutil.ReadFile("back/cmd/config.json")
	err := json.Unmarshal(file, &ConfigData)
	if err != nil {
		fmt.Println(err)
		return
	}
}
func getRequestBody(r *http.Request) string {
	b, _ := ioutil.ReadAll(r.Body)
	bod := string(b)
	return bod
}
func sendResponseJson(writer http.ResponseWriter, res interface{}) {
	resJson, _ := json.Marshal(res)
	_, err := writer.Write(resJson)
	if err != nil {
		print(err.Error())
	}
}
