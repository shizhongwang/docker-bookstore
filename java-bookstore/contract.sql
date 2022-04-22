USE springbootapps;

-- create book table tbl_contract
CREATE TABLE IF NOT EXISTS `springbootapps`.`tbl_contract`
(
    `id`          BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name`        VARCHAR(255)   DEFAULT NULL,
    `description` VARCHAR(255)   DEFAULT NULL,
    `firstParty`  VARCHAR(255)   DEFAULT NULL,
    `secondParty` VARCHAR(255)   DEFAULT NULL,
    `amount`      DECIMAL(13, 2) DEFAULT NULL,

    `memo`        VARCHAR(255)   DEFAULT NULL,
    `image_url`   VARCHAR(255)   DEFAULT NULL,

    `createAt`    DATETIME       DEFAULT NULL,
    `updateAt`    DATETIME       DEFAULT NULL,
    `active`      BIT            DEFAULT 1,
    `category_id` BIGINT(20) NOT NULL,
    FOREIGN KEY (`category_id`) REFERENCES `tbl_category` (`id`)
);

INSERT INTO tbl_contract
(name,
 description,
 firstParty,
 secondParty,
 amount,
 memo,
 image_url,
 createAt,
 updateAt,
 active,
 category_id)
VALUES ('Contract name',
        'webdevelopment-100',
        'first parry',
        'second party',
        88888,
        'memo',
        'assets/images/webdevelopment/webdevelopment-100.jpg',
        NOW(),
        NOW(),
        1,
        1);
