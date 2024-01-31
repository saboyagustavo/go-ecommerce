package entity

import "github.com/google/uuid"

type Category struct {
	ID   string
	Name string
}

func NewCategory(name string) *Category {
	return &Category{
		ID:   uuid.New().String(),
		Name: name,
	}
}

type Product struct {
	ID           string
	Name         string
	Descritption string
	CategoryID   string
	ImageURL     string
	Price        float64
}

func NewProduct(
	name, descritption, categoryID, imageURL string,
	price float64,
) *Product {
	return &Product{
		ID:           uuid.New().String(),
		Name:         name,
		Descritption: descritption,
		CategoryID:   categoryID,
		ImageURL:     imageURL,
		Price:        price,
	}
}
