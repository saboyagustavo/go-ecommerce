package main

import (
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
	entity.UseBaseURL(baseURL)
}

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/go-api-db")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	categoryDB := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(categoryDB)
	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)

	productDB := database.NewProductDB(db)
	productService := service.NewProductService(productDB)
	webProductHandler := webserver.NewWebProductHandler(productService)

	handlers := map[string]http.Handler{
		"/category": webCategoryHandler.GetRouter(),
		"/product":  webProductHandler.GetRouter(),
	}

	r := webserver.NewRouter(handlers)

	fmt.Println("·•.▪▐ SERVER IS UP AND RUNNING ON PORT", apiPort, "▐ ▪.•·")
	http.ListenAndServe(":"+apiPort, r)
}
