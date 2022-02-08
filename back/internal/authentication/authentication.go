package authentication

import (
	"github.com/golang-jwt/jwt"
	"time"
)

//secret for creating JWT's
var hmacSampleSecret = []byte("toooooooooooo secret")

// map for tracking tries of a JWT in a minute
var jwtTries = map[string]int{}
var jwtTime = map[string]time.Time{}

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
