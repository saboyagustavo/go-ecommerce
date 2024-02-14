package database

import (
	"context"
	"log"

	"github.com/saboyagustavo/go-ecommerce/internal/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ImageDB struct {
	client     *mongo.Client
	dbName     string
	collection string
}

func (imgDB *ImageDB) GetClient() *mongo.Client {
	return imgDB.client
}

func NewImageDB(connectionString, dbName string) *ImageDB {
	client, err := mongo.Connect(
		context.Background(),
		options.Client().ApplyURI(connectionString),
	)

	if err != nil {
		log.Fatalf("mongodb connection error: %v", err)
	}

	return &ImageDB{
		client:     client,
		dbName:     dbName,
		collection: "images",
	}
}

func (imgDB *ImageDB) CreateImage(image entity.Image) error {
	collection := imgDB.client.Database(imgDB.dbName).Collection(imgDB.collection)
	_, err := collection.InsertOne(context.Background(), image)
	return err
}

func (imgDB *ImageDB) GetImage(id string) ([]byte, error) {
	collection := imgDB.client.Database(imgDB.dbName).Collection(imgDB.collection)

	var image entity.Image

	err := collection.FindOne(
		context.Background(),
		bson.M{"_id": id},
	).Decode(&image)

	if err != nil {
		return nil, err
	}

	return image.Data, nil
}
