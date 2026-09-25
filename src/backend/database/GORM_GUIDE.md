# Using GORM in this project

## GORM Summary

GORM is a library that serves as translation layer between Go code and SQL that Postgres uses. Good because we dont have to write manual SQL lines and are less error prone (errors should be caught at write time and not runtime)

## Explanation of models.go and db.go files

- `database/models.go` — similar to prisma.schema - defines how tables look like and what they contain
- `database/db.go` — connects to Postgres and makes sure the tables
  exist, matching `models.go`

You shouldnt touch them at all.
## Env file

### Needs to have:

POSTGRES_USER=transcendence

POSTGRES_PASSWORD=pass123

POSTGRES_DB=transcendence

## Setup — do this once (dont forget to update go.mod on github)

You must have already go.mod file and use CLI from same directory.

```bash
go get gorm.io/gorm gorm.io/driver/postgres github.com/google/uuid
```

This will download library and write them in go.mod (nobody else needs to do it, as when they try to run server on their machine, it should download automatically when reading mod.go file)

## Using it — the two things every file needs

**1. In main.go (before server starts):**

```go
import "transcendence/src/backend/database"

func main() {
    database.InitDB() // opens connection to database, updates tables
    // ... 
    //server start
}
```
**2. For any file that will read or write from database (so any that will use gorm methods) add the import:**

```go
import "transcendence/src/backend/database"
```
## CRUD — Create - read - update - delete

https://gorm.io/docs/create.html — Create

https://gorm.io/docs/query.html — Read (First, Find, Where)

https://gorm.io/docs/update.html — Update

https://gorm.io/docs/delete.html — Delete

## Error handling

GORM returns a `.Error` field on almost every call — always check it.

https://gorm.io/docs/error_handling.html
