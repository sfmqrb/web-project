package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"web/project/internal/Entities"
	"web/project/internal/authentication"
	"web/project/internal/database"
	"web/project/internal/image"
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
		createUserRequest := queryHandeler.RegisterRequest{}
		err := json.Unmarshal([]byte(getRequestBody(request)), &createUserRequest)
		if err != nil {
			responseWriter.WriteHeader(http.StatusBadRequest)
			return
		}
		loginResponse := queryHandeler.HandleRegisterQuery(createUserRequest, ConfigData.SessionLimit)
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
		switch request.Method {
		case http.MethodPost:
			if len(urlList) > 3 && urlList[3] == "comment" {
				// comment in recipe
				jwt := request.Header.Get("jwt")
				_username, done := digestJwt(responseWriter, jwt)
				if done {
					return
				}
				var comment Entities.Comment
				err := json.Unmarshal([]byte(getRequestBody(request)), &comment)
				if err != nil {
					responseWriter.WriteHeader(http.StatusBadRequest)
					return
				}
				err = queryHandeler.HandleRecipeComment(urlList[2], comment, _username)
				if err != nil {
					// in case writing comment for someone else
					responseWriter.Write([]byte(err.Error()))
					responseWriter.WriteHeader(http.StatusNotAcceptable)
					return
				}
			} else {
				// send recipe
				jwt := request.Header.Get("jwt")
				_username, done := digestJwt(responseWriter, jwt)
				if done {
					return
				}
				var recipe Entities.Recipe
				err := json.Unmarshal([]byte(getRequestBody(request)), &recipe)
				if err != nil {
					responseWriter.WriteHeader(http.StatusBadRequest)
					return
				}
				queryHandeler.HandelSendRecipe(recipe, _username)
			}
		case http.MethodDelete:
			// delete recipe
			jwt := request.Header.Get("jwt")
			_username, done := digestJwt(responseWriter, jwt)
			if done {
				return
			}
			if queryHandeler.HandelDelRecipe(urlList[2], _username) {
				responseWriter.WriteHeader(http.StatusOK)
			} else {
				responseWriter.WriteHeader(http.StatusNotAcceptable)
			}
			return
		case http.MethodGet:
			if urlList[2] == "all" {
				sendResponseJson(responseWriter, queryHandeler.HandleGetAllRecipe())
			} else {
				recipe := queryHandeler.HandelGetRecipe(urlList[2])
				sendResponseJson(responseWriter, recipe)
			}
		case http.MethodPut:
			//edit recipe
			jwt := request.Header.Get("jwt")
			_username, done := digestJwt(responseWriter, jwt)
			if done {
				return
			}
			if queryHandeler.HandelUpdateRecipe(urlList[2], _username) {
				responseWriter.WriteHeader(http.StatusOK)
			} else {
				responseWriter.WriteHeader(http.StatusNotAcceptable)
			}
			return
		}
	case "users":
		if len(urlList) > 3 {
			switch urlList[3] {
			case "recipes":
				recipes := queryHandeler.HandleGetUserRecipes(urlList[2])
				sendResponseJson(responseWriter, recipes)
			case "followers":
				jwt := request.Header.Get("jwt")
				_username, done := digestJwt(responseWriter, jwt)
				if done {
					return
				}
				followers := queryHandeler.HandelGetFollowers(_username)
				sendResponseJson(responseWriter, followers)
			case "followings":
				jwt := request.Header.Get("jwt")
				_username, done := digestJwt(responseWriter, jwt)
				if done {
					return
				}
				followings := queryHandeler.HandelGetFollowings(_username)
				sendResponseJson(responseWriter, followings)
			}

		}
		jwt := request.Header.Get("jwt")
		_username, done := digestJwt(responseWriter, jwt)
		if done {
			return
		}
		switch request.Method {
		case http.MethodGet:
			//get profile
			user, found := queryHandeler.HandelGetProfile(_username, urlList[2])
			if !found {
				responseWriter.WriteHeader(http.StatusBadRequest)
				return
			}
			sendResponseJson(responseWriter, user)
		case http.MethodPut:
			//follow
			queryHandeler.HandelFollow(_username, urlList[2])
		case http.MethodDelete:
			//unfollow
			queryHandeler.HandelUnfollow(_username, urlList[2])

		}
	case "image":
		switch request.Method {
		case http.MethodGet:
			imageBytes := image.HandleDownloadImage(urlList[2])
			if imageBytes == nil {
				responseWriter.WriteHeader(http.StatusNotFound)
			} else {
				_, err := responseWriter.Write(imageBytes)
				responseWriter.WriteHeader(http.StatusFound)
				if err != nil {
					return
				}
			}
		case http.MethodPost:
			imageBytes, err := ioutil.ReadAll(request.Body)
			if err != nil {
				return
			}
			saveName := image.HandleUploadImage(imageBytes, urlList[2])
			if saveName == "" {
				responseWriter.WriteHeader(http.StatusInternalServerError)
			} else {
				responseWriter.WriteHeader(http.StatusOK)
				sendResponseJson(responseWriter, image.UploadResponse{FileName: saveName})
			}
		}
	case "tag":
		tag := queryHandeler.HandleGetTag(urlList[2])
		if tag.Name == "" {
			responseWriter.WriteHeader(http.StatusNoContent)
			return
		}
		sendResponseJson(responseWriter, tag)
		responseWriter.WriteHeader(http.StatusFound)

	}
}

func digestJwt(responseWriter http.ResponseWriter, jwt string) (string, bool) {
	_username := authentication.VerifyJWT(jwt, ConfigData.MinuteTryLimit)
	if _username == "l" {
		// try limit reached
		responseWriter.WriteHeader(http.StatusTooManyRequests)
		return "", true
	} else if _username == "" {
		// invalid jwt
		responseWriter.WriteHeader(http.StatusNonAuthoritativeInfo)
	}
	return _username, false
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
