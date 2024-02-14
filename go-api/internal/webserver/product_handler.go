package webserver

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"

	"github.com/saboyagustavo/go-ecommerce/internal/entity"
	"github.com/saboyagustavo/go-ecommerce/internal/service"
)

type WebProductHandler struct {
	ProductService *service.ProductService
	ImageHandler   *WebImageHandler
}

func NewWebProductHandler(productService *service.ProductService, imageHandler *WebImageHandler) *WebProductHandler {
	return &WebProductHandler{
		ProductService: productService,
		ImageHandler:   imageHandler,
	}
}

func (wph *WebProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "product id is required", http.StatusBadRequest)
		return
	}

	product, err := wph.ProductService.GetProduct(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(product)
}

func (wph *WebProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	products, err := wph.ProductService.GetProducts()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (wph *WebProductHandler) GetProductsByCategoryId(w http.ResponseWriter, r *http.Request) {
	categoryID := chi.URLParam(r, "categoryID")
	if categoryID == "" {
		http.Error(w, "categoryID is required", http.StatusBadRequest)
		return
	}

	products, err := wph.ProductService.GetProductsByCategoryId(categoryID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(products)
}

func (wph *WebProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	// Upload image and get imageID
	imageID, err := wph.ImageHandler.UploadImage(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	pName := r.FormValue("productName")
	pDescription := r.FormValue("productDescription")
	pCategoryId := r.FormValue("productCategoryId")
	pPriceStr := r.FormValue("productPrice")

	pPrice, err := strconv.ParseFloat(pPriceStr, 64)
	if err != nil {
		http.Error(w, "invalid price format", http.StatusBadRequest)
		return
	}

	if pName == "" || pDescription == "" || pCategoryId == "" {
		http.Error(w, "name, description, and categoryId are required", http.StatusBadRequest)
		return
	}

	var product entity.Product
	product.SetImageURL(imageID)

	result, err := wph.ProductService.CreateProduct(
		pName,
		pDescription,
		pCategoryId,
		product.ImageURL,
		pPrice,
	)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func (wph *WebProductHandler) GetRouter() http.Handler {
	r := chi.NewRouter()

	r.Get("/", wph.GetProducts)
	r.Get("/{id}", wph.GetProduct)
	r.Get("/category/{categoryID}", wph.GetProductsByCategoryId)

	r.Post("/", wph.CreateProduct)

	return r
}
