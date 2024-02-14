package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql"

	"github.com/joho/godotenv"
	"github.com/saboyagustavo/go-ecommerce/internal/database"
	"github.com/saboyagustavo/go-ecommerce/internal/entity"
	"github.com/saboyagustavo/go-ecommerce/internal/service"
	"github.com/saboyagustavo/go-ecommerce/internal/webserver"
)

var apiPort string
var dbSource string
var mongoConnectionURI string
var mongoDBName string

func init() {
	loadEnv()
}

func loadEnv() {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	baseURL := os.Getenv("API_BASE_URL")
	apiPort = os.Getenv("API_PORT")
	dbSource = os.Getenv("DB_SOURCE")

	mongoConnectionURI = os.Getenv("MONGO_CONNECTION_URI")
	mongoDBName = os.Getenv("MONGO_DB_NAME")
	entity.UseBaseURL(baseURL)
}

func main() {
	db, err := sql.Open("mysql", dbSource)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	imageDB := database.NewImageDB(mongoConnectionURI, mongoDBName)
	defer imageDB.GetClient().Disconnect(context.Background())

	imageService := service.NewImageService(imageDB)
	webImageHandler := webserver.NewWebImageHandler(imageService)

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(categoryDB)
	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(productDB)
	webProductHandler := webserver.NewWebProductHandler(productService, webImageHandler)

	handlers := map[string]http.Handler{
		"/category": webCategoryHandler.GetRouter(),
		"/product":  webProductHandler.GetRouter(),
		"/image":    webImageHandler.GetRouter(),
	}

	r := webserver.NewRouter(handlers)

	fmt.Println("·•.▪▐ SERVER IS UP AND RUNNING ON PORT", apiPort, "▐ ▪.•·")
	http.ListenAndServe(":"+apiPort, r)
}
