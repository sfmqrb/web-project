# Back

## Run
In `./back` directory:
- for installing packages: `go mod download`
- for running server: `go run ./cmd/server.go` (Note that you have to replace '/' to '\' if you are in windows ;)

## config
You can config backend server using files `cmd/config.json` and database using `internal/database/config.json`

## database
You should have users, recipes, ingredients and tags collections in database that is set in `internal/database/config.json.dbName`. You can find some dummy values for ingredients and tags in `back/internal/database/init_value`
