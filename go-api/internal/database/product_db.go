package database

import (
	"database/sql"

	"github.com/saboyagustavo/go-ecommerce/internal/entity"
)

type ProductDB struct {
	db *sql.DB
}

func NewProductDB(db *sql.DB) *ProductDB {
	return &ProductDB{db: db}
}

func (proDB *ProductDB) GetProduct(id string) (*entity.Product, error) {
	var product entity.Product
	err := proDB.db.QueryRow(`
		SELECT
			id,
			name,
			description,
			category_id,
			image_url,
			price
		FROM products
		WHERE id = ?
	`, id,
	).Scan(
		&product.ID,
		&product.Name,
		&product.Description,
		&product.CategoryID,
		&product.ImageURL,
		&product.Price,
	)

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func (proDB *ProductDB) GetProducts() ([]*entity.Product, error) {
	rows, err := proDB.db.Query(`
		SELECT
			id,
			name,
			description,
			category_id,
			image_url,
			price
		FROM products
	`)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {
		var product entity.Product

		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.CategoryID,
			&product.ImageURL,
			&product.Price,
		)

		if err != nil {
			return nil, err
		}

		products = append(products, &product)
	}

	return products, nil
}

func (proDB *ProductDB) GetProductsByCategoryID(categoryID string) ([]*entity.Product, error) {
	rows, err := proDB.db.Query(`
		SELECT
			id,
			name,
			description,
			category_id,
			image_url,
			price
		FROM products
		WHERE category_id = ?
	`, categoryID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var products []*entity.Product

	for rows.Next() {
		var product entity.Product

		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.CategoryID,
			&product.ImageURL,
			&product.Price,
		)

		if err != nil {
			return nil, err
		}

		products = append(products, &product)
	}

	return products, nil
}

func (proDB *ProductDB) CreateProduct(product *entity.Product) (*entity.Product, error) {
	_, err := proDB.db.Exec(`
		INSERT INTO products (
			id,
			name,
			description,
			category_id,
			image_url,
			price
		) VALUES (
			?, ?, ?, ?, ?, ?
		)
	`,
		product.ID,
		product.Name,
		product.Description,
		product.CategoryID,
		product.ImageURL,
		product.Price,
	)

	if err != nil {
		return nil, err
	}

	return product, nil
}
