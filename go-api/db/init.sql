CREATE TABLE IF NOT EXISTS `categories`(
  `id` VARCHAR(36) NOT NULL, 
  `name` VARCHAR(255) NOT NULL, 
  PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `products`(
  `id` VARCHAR(36) NOT NULL, 
  `name` VARCHAR(255) NOT NULL, 
  `description` VARCHAR(255) NOT NULL, 
  `category_id` VARCHAR(36) NOT NULL, 
  `image_url` VARCHAR(255) NOT NULL, 
  `price` DECIMAL(10,2) NOT NULL, 
  PRIMARY KEY(`id`),
  KEY `fk_products_categories_idx` (`category_id`)
);