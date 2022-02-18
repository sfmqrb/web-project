package authentication

import (
	"fmt"
	"github.com/golang-jwt/jwt"
	"time"
)

//secret for creating JWT's
var hmacSampleSecret = []byte("toooooooooooo secret")

// map for tracking tries of a JWT in a minute
var jwtTries = map[string]int{}

func CreateJWT(username string, sessionLength int) string {
	now := time.Now()
	until := now.Add(time.Minute * time.Duration(sessionLength))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"nbf":      now.Unix(),
		"exp":      until.Unix(),
		"username": username,
	})
	tokenString, _ := token.SignedString(hmacSampleSecret)
	jwtTries[tokenString] += 1
	//start ticker for reset jwt tries
	ticker := time.NewTicker(time.Minute)
	go func(ts string, ticker *time.Ticker) {
		for range ticker.C {
			jwtTries[ts] = 0
		}
	}(tokenString, ticker)
	return tokenString
}

func VerifyJWT(tokenString string, minuteTryLimit int) string {
	token, err := jwt.ParseWithClaims(tokenString, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return hmacSampleSecret, nil
	})
	if token == nil {
		//invalid jwt
		return ""
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if jwtTries[tokenString] <= minuteTryLimit {
			jwtTries[tokenString] += 1
			//valid jwt
			return claims["username"].(string)
		} else {
			// try limit reached
			return "l"
		}
	} else {
		fmt.Println(err)
		//invalid jwt
		return ""
	}
}
