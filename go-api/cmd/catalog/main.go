package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	_ "github.com/go-sql-driver/mysql"

	"github.com/saboyagustavo/go-ecommerce/internal/database"
	"github.com/saboyagustavo/go-ecommerce/internal/service"
	"github.com/saboyagustavo/go-ecommerce/internal/webserver"
)

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

	r := chi.NewRouter()
	/* MIDDLEWARE STACK ------------------------------------------------------- */
	// r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	/* CATEGORY ROUTES -------------------------------------------------------- */
	r.Get("/category/all", webCategoryHandler.GetCategories)
	r.Get("/category/{id}", webCategoryHandler.GetCategory)
	r.Post("/category", webCategoryHandler.CreateCategory)

	/* PRODUCT ROUTES --------------------------------------------------------- */
	r.Get("/product/all", webProductHandler.GetProducts)
	r.Get("/product/{id}", webProductHandler.GetProduct)
	r.Get("/product/{categoryID}", webProductHandler.GetProductsByCategoryId)
	r.Post("/product", webProductHandler.CreateProduct)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("go-api version 1.0"))
	})

	http.ListenAndServe(":8888", r)
	fmt.Println("·•.▪▐ SERVER IS UP AND RUNNING ON PORT 8888 ▐ ▪.•·")
}
