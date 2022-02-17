package tools

import (
	"back/internal/Entities"
	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

func RemoveDuplicateStr(strSlice []string) []string {
	allKeys := make(map[string]bool)
	var list []string
	for _, item := range strSlice {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			list = append(list, item)
		}
	}
	return list
}

func HashPassword(password string) string {
	pw := []byte(password)
	result, err := bcrypt.GenerateFromPassword(pw, bcrypt.DefaultCost)
	if err != nil {
		logrus.Fatal(err.Error())
	}
	return string(result)
}

func ComparePassword(hashPassword string, password string) error {
	pw := []byte(password)
	hw := []byte(hashPassword)
	err := bcrypt.CompareHashAndPassword(hw, pw)
	return err
}

func RemoveStrFromSlice(s []string, r string) []string {
	for i, v := range s {
		if v == r {
			return append(s[:i], s[i+1:]...)
		}
	}
	return s
}
func RemoveMiniRecipeFromSlice(s []Entities.MiniRecipe, r Entities.MiniRecipe) []Entities.MiniRecipe {
	for i, v := range s {
		if v.MainId == r.MainId {
			return append(s[:i], s[i+1:]...)
		}
	}
	return s
}
