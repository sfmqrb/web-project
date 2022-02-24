# Back

##Run
in back directory:
- for installing packages: `go mod download`
- for running server: `go run .\cmd\server.go`

## config
you can config backend server using files cmd\config.json and database using internal\database\config.json

##database
tou should have users, recipes, ingredients and tags collections in database that sets in internal\database\config.json.dbName
you can find some dummy value for ingredients and tags in back\internal\database\init_value
