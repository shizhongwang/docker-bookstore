drop database springbootapps;
create database springbootapps;

USE springbootapps;
CREATE TABLE IF NOT EXISTS `springbootapps`.`contract`
(
    `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `client_name`           VARCHAR(255)   DEFAULT NULL,
    `contract_num`    VARCHAR(255)   DEFAULT NULL,
    `contract_at`      DATETIME       DEFAULT NULL,
    `contract_amount`         DECIMAL(13, 2) DEFAULT NULL,
    `project_name`    VARCHAR(255)   DEFAULT NULL,

    `desc`    VARCHAR(10240)   DEFAULT NULL,

    `create_at`      DATETIME       DEFAULT NULL,
    `update_at`      DATETIME       DEFAULT NULL
);

