package webserver

import (
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
)

func NewRouter(wch *WebCategoryHandler, wph *WebProductHandler) *chi.Mux {
	r := chi.NewRouter()

	/* MIDDLEWARE STACK ------------------------------------------------------- */
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	/* CATEGORY ROUTES -------------------------------------------------------- */
	r.Get("/category", wch.GetCategories)
	r.Get("/category/{id}", wch.GetCategory)
	r.Post("/category", wch.CreateCategory)

	/* PRODUCT ROUTES --------------------------------------------------------- */
	r.Get("/product/{id}", wph.GetProduct)
	r.Get("/product", wph.GetProducts)
	r.Get("/product/category/{categoryID}", wph.GetProductsByCategoryId)
	r.Post("/product", wph.CreateProduct)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("go-api version 1.0"))
	})

	return r
}
