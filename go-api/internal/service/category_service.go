package service

import (
	"github.com/saboyagustavo/go-ecommerce/internal/database"
	"github.com/saboyagustavo/go-ecommerce/internal/entity"
)

type CategoryService struct {
	CategoryDB *database.CategoryDB
}

func NewCategoryService(categoryDB *database.CategoryDB) *CategoryService {
	return &CategoryService{CategoryDB: categoryDB}
}

func (cs *CategoryService) GetCategories() ([]*entity.Category, error) {
	categories, err := cs.CategoryDB.GetCategories()
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (cs *CategoryService) GetCategory(id string) (*entity.Category, error) {
	category, err := cs.CategoryDB.GetCategory(id)
	if err != nil {
		return nil, err
	}
	return category, err
}

func (cs *CategoryService) CreateCategory(name string) (string, error) {
	category := entity.NewCategory(name)
	categoryID, err := cs.CategoryDB.CreateCategory(category)
	if err != nil {
		return "", err
	}
	return categoryID, nil
}
