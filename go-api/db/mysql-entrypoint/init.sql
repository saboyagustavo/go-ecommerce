use catalog_db;

CREATE TABLE IF NOT EXISTS `categories`(
  `id` VARCHAR(36) NOT NULL, 
  `name` VARCHAR(255) NOT NULL, 
  PRIMARY KEY(`id`)
);

INSERT INTO `catalog_db`.`categories` (`id`,`name`) VALUES ("6b4c28f4-6831-495a-9444-19c93452faa3","Relogios");
INSERT INTO `catalog_db`.`categories` (`id`,`name`) VALUES ("7c0ca0d4-ff23-4bd7-b131-c563067c4b43","Eletronicos");

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

INSERT INTO `catalog_db`.`products` (`id`,`name`,`description`,`price`,`category_id`,`image_url`)
VALUES ("7f8c9d8e-9f0a-1b2c-3d4e-5f6g7h8i9j0k","Product 1","Description 1", 100, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/77d303f3-ce3f-4b81-98ea-8182164f9daf"),
("66805003-f9a2-4772-b577-d5ff66207707","Product 2","Description 2", 200, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/12a6f48d-8e65-4798-bdb9-8c4bb022e985"),
("121829b9-e9f9-4ca9-bd14-b087afedd587","Product 3","Description 3", 300, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/eef31f10-ca37-4ccd-9c6a-2602d907a9bc"),
("ef3d9a49-4c73-4192-97dd-55e21c0e2707","Product 4","Description 4", 400, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/633dc461-c3c1-484a-8764-e0f940602c05"),
("6d602b3a-1e72-4b03-a29c-14095e57027b","Product 5","Description 5", 500, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/07f5c410-744c-49f6-a514-bf8e9ca8f84f"),
("dad6f8fb-3149-4d0b-861e-03d29c6accf0","Product 6","Description 6", 600, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/a8368726-9a2a-401c-972a-8a9cd828f483"),
("61c176d5-f4f9-4fbd-a892-41058422868e","Product 7","Description 7", 700, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/40d903f3-440e-427b-a31a-de77990710ed"),
("ed394062-14bc-4ff2-bf43-a77473322171","Product 8","Description 8", 800, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/f7b52f90-c47e-418f-ad25-410f54242e3e"),
("4e6d8a64-5389-4623-ad40-e3f95b0607f7","Product 9","Description 9", 900, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/060926cb-6106-4ec5-9354-4af654d281d1"),
("924e4979-f471-4a3f-bf52-d3316485c06c","Product 10","Description 10", 1000, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/dcfa4693-c9f1-44a3-84ee-25130f2821db"),
("80a22ccc-50f6-40ed-a18d-8cd152ae40f9","Product 11","Description 11", 1100, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/478a86cb-fff0-4c25-95d6-453a182ca7d1"),
("740d95cb-c9be-4c2c-992d-8ad53e6b5d0c","Product 12","Description 12", 1200, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/cb3e9194-5ee7-45ed-9066-5a7b602f512b"),
("04c4353a-3f6d-4272-a8f2-44b82c05ecc0","Product 13","Description 13", 1300, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/1cff6c0d-e1c7-4833-a3f1-fab8718c5599"),
("8db7d6a5-43f0-420a-8023-7b37b21bec27","Product 14","Description 14", 1400, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/cc6039f2-5254-4899-97df-10822039350a"),
("557be765-4f09-49b1-bd33-b7e30fc7316c","Product 15","Description 15", 1500, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/26ed932d-e440-4914-9723-a5ab30f8623b"),
("0afa7630-4fc1-4d69-beed-4f8f15becadc","Product 16","Description 16", 1600, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/7dd77ba7-a657-494b-a8df-b76670444e44"),
("2261af8a-e453-42e2-b2b0-ea268bb11a41","Product 17","Description 17", 1700, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/88c6e322-e890-4b10-98ec-abee335ec59b"),
("fbe61a31-7bb4-4e53-9268-9138d4d038d3","Product 18","Description 18", 1800, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/1265e3f6-6e62-4f3c-8574-d32eb1ad9150"),
("506610a1-ba99-4c14-a7b2-3c52877e8ec2","Product 19","Description 19", 1900, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/b69d682b-110a-4a79-9c5d-08191701e4d7"),
("eb296629-1fce-43ca-8413-1b3bddd07106","Product 20","Description 20", 2000, "6b4c28f4-6831-495a-9444-19c93452faa3", "http://localhost:8888/image/49aace14-af00-4387-b2b1-5333fc43cd58");