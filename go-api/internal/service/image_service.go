package service

import (
	"github.com/saboyagustavo/go-ecommerce/internal/database"
	"github.com/saboyagustavo/go-ecommerce/internal/entity"
)

type ImageService struct {
	ImageDB *database.ImageDB
}

func NewImageService(imageDB *database.ImageDB) *ImageService {
	return &ImageService{ImageDB: imageDB}
}

func (is *ImageService) CreateImage(name, owner string, data []byte) (*entity.Image, error) {
	image := entity.NewImage(name, owner, data)
	err := is.ImageDB.CreateImage(*image)
	if err != nil {
		return nil, err
	}
	return image, nil
}

func (is *ImageService) GetImage(id string) ([]byte, error) {
	image, err := is.ImageDB.GetImage(id)
	if err != nil {
		return nil, err
	}
	return image, nil
}
