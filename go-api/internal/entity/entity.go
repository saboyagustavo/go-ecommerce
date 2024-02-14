package entity

import (
	"fmt"

	"github.com/google/uuid"
)

var baseURL string

type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func NewCategory(name string) *Category {
	return &Category{
		ID:   uuid.New().String(),
		Name: name,
	}
}

type Product struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	CategoryID  string  `json:"category_id"`
	ImageURL    string  `json:"image_url"`
	Price       float64 `json:"price"`
}

func NewProduct(
	name, description, categoryID, imageURL string,
	price float64,
) *Product {
	return &Product{
		ID:          uuid.New().String(),
		Name:        name,
		Description: description,
		CategoryID:  categoryID,
		ImageURL:    imageURL,
		Price:       price,
	}
}

func UseBaseURL(URL string) {
	baseURL = URL
}

func (p *Product) SetImageURL(imageID string) {
	p.ImageURL = fmt.Sprintf("%s/image/%s", baseURL, imageID)
}

type Image struct {
	ID    string `json:"id" bson:"_id"`
	Name  string `json:"name" bson:"name"`
	Data  []byte `json:"data" bson:"data"`
	Owner string `json:"owner" bson:"owner"`
}

func NewImage(name, owner string, data []byte) *Image {
	return &Image{
		ID:    uuid.New().String(),
		Name:  name,
		Owner: owner,
		Data:  data,
	}
}
