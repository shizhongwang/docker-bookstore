## github access
### change /etc/hosts, add below IP
    140.82.114.3 github.com
    199.232.69.194 github.global.ssl.fastly.net
    185.199.108.153 assets-cdn.github.com
    185.199.109.153 assets-cdn.github.com
    185.199.110.153 assets-cdn.github.com
    185.199.111.153 assets-cdn.github.com

    github.com/shizhongwang
    docker run -it -v /Users/shizhongwang/docker/ubuntu-noi-v2.0.iso:/docker/ubuntu-noi-v2.0.iso noi2


    git config --global user.email "shizhong_wang@126.com"
    git config --global user.name "shizhongwang"

    github user account: shizhongwang/shizhong_wang@126.com/C...2#
    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


### intellij Idea
    2020.3 idea
    Plugins 内手动添加第三方插件仓库地址：https://plugins.zhile.io
    install plugin 'eval reset'
    brew install gradle
    config JAVA_HOME


https://www.ctyun.cn/sso/loginto
suyantao@126.com        alwdhqidt1974$
-> 北京5

## docker

- github
    use OpenSource to manage Git repo
    git clone https://github.com/shizhongwang/docker-bookstore
- how to start docker
    cmd+space, to start up Docker on Mac
    cd ~/working/my/yantao/docker-bookstore         //where the docker-compose.yaml file is
    docker-compose up
- vscode
    open angular-bookstore
- Idea
    open java-bookstore
    gradle build  -x test           //to build the java project

## java code develop locally
    - start mysql in docker to provide DB service
        docker-compose --file docker-compose-mysql.yml up
    - using idea to start the web server
    - postman, shizhong_wang@126.com/ shizhong001/ C...1


### mysql
1. mysql -uroot -proot


## file copy for ng and java
scp -r /Users/shizhongwang/working/yantao/docker-bookstore/angular-bookstore/dist/angular-bookstore/ root@49.7.182.249:/root/yantao/angular-bookstore/dist/
scp -r /Users/shizhongwang/working/yantao/docker-bookstore/java-bookstore/build/libs/ root@49.7.182.249:/root/yantao/java-bookstore/build/

password:   tianyiyun@2022



scp -r root@49.7.182.249:/root/yantao/ /Users/stephen/working/my/yantao/mydocker2/


## table schema
CREATE TABLE IF NOT EXISTS `springbootapps`.`contract`
(
    `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `client_name`           VARCHAR(255)   DEFAULT NULL,
    `contract_num`    VARCHAR(255)   DEFAULT NULL,
    `contract_at`      DATETIME       DEFAULT NULL,
    `contract_amount`         DECIMAL(13, 2) DEFAULT NULL,
    `project_name`    VARCHAR(255)   DEFAULT NULL,

    `description`    VARCHAR(10240)   DEFAULT NULL,

    `create_at`      DATETIME       DEFAULT NULL,
    `update_at`      DATETIME       DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `springbootapps`.`contract_statement`
(
    `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `transaction_at`      DATETIME       DEFAULT NULL,
    `voucher_num`    VARCHAR(255)   DEFAULT NULL,
    `debit_amount`         DECIMAL(13, 2) DEFAULT NULL,
    `credit_amount`         DECIMAL(13, 2) DEFAULT NULL,
    `remaining_balance`         DECIMAL(13, 2) DEFAULT NULL,

    `bank_serial_id`    VARCHAR(255)   DEFAULT NULL,
    `opposite_account_num`    VARCHAR(255)   DEFAULT NULL,
    `opposite_company_name`    VARCHAR(255)   DEFAULT NULL,
    `category`    VARCHAR(255)   DEFAULT NULL,

    `invoice_num`    VARCHAR(255)   DEFAULT NULL,

    `description`    VARCHAR(10240)   DEFAULT NULL,
    `create_at`      DATETIME       DEFAULT NULL,
    `update_at`      DATETIME       DEFAULT NULL
);

-- add another field for contract
ALTER TABLE `springbootapps`.`contract` ADD company_name VARCHAR(255);
UPDATE `springbootapps`.`contract` SET company_name = '众邦信达' where id <= 5;
UPDATE `springbootapps`.`contract` SET company_name = '第二个公司' where id > 5;


ALTER TABLE `springbootapps`.`contract_statement` ADD contract_num VARCHAR(255);
UPDATE `springbootapps`.`contract_statement` SET contract_num = 'ZBS2021-001-003' where id <=5;
UPDATE `springbootapps`.`contract_statement` SET contract_num = 'ZBS2021-001-005' where id >5;

ALTER TABLE `springbootapps`.`contract_statement` ADD client_name VARCHAR(255);

-- update statement and invoice client_name
update `springbootapps`.`contract_statement` A inner join (select contract_num, client_name from `springbootapps`.`contract`) c on A.contract_num = c.contract_num set A.client_name = c.client_name;
update `springbootapps`.`contract_invoice` A inner join (select contract_num, client_name from `springbootapps`.`contract`) c on A.contract_num = c.contract_num set A.client_name = c.client_name;



CREATE TABLE IF NOT EXISTS `springbootapps`.`contract_invoice`
(
    `id`             BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `contract_num`    VARCHAR(255)   DEFAULT NULL,
    `client_name`           VARCHAR(255)   DEFAULT NULL,

    `invoice_category`    VARCHAR(255)   DEFAULT NULL,
    `invoice_id`    VARCHAR(255)   DEFAULT NULL,
    `invoice_num`    VARCHAR(255)   DEFAULT NULL,

    `product_category`           VARCHAR(255)   DEFAULT NULL,
    `product_name`           VARCHAR(255)   DEFAULT NULL,
    `product_model`           VARCHAR(255)   DEFAULT NULL,
    `product_unit`           VARCHAR(255)   DEFAULT NULL,
    `product_count`           DECIMAL(13, 2) DEFAULT NULL,

    `amount`         DECIMAL(13, 2) DEFAULT NULL,
    `tax`         DECIMAL(13, 2) DEFAULT NULL,
    `sum`         DECIMAL(13, 2) DEFAULT NULL,

    `invoice_sum`         DECIMAL(13, 2) DEFAULT NULL,
    `invoice_at`      DATETIME       DEFAULT NULL,

    `description`    VARCHAR(10240)   DEFAULT NULL,
    `create_at`      DATETIME       DEFAULT NULL,
    `update_at`      DATETIME       DEFAULT NULL
);


[{
    "id" : 101,
    "clientName" : "北京永安热力有限公司",
    "contractNum" : "ZBS2021-001-006",
    "contractAt" : "2012-01-01",
    "contractAmount" : 6896830.00,
    "projectName" : "世涛天朗、邑上苑热计量改造项目",
    "description" : "世涛天朗、邑上苑热计量改造项目世涛天朗、邑上苑热计量改造项目",
    "createAt" : "2012-01-01",
    "updateAt" : "2012-01-01"
},
{
    "id" : 101,
    "clientName" : "北京XX有限公司",
    "contractNum" : "ZBS2021-001-006",
    "contractAt" : "2012-01-01",
    "contractAmount" : 6896830.00,
    "projectName" : "世涛天朗、邑上苑热计量改造项目",
    "description" : "世涛天朗、邑上苑热XX量改造项目",
    "createAt" : "2012-01-01",
    "updateAt" : "2012-01-01"
},
{
    "id" : 101,
    "clientName" : "北京AA有限公司",
    "contractNum" : "ZBS2021-001-006",
    "contractAt" : "2012-01-01",
    "contractAmount" : 6896830.00,
    "projectName" : "AAAAAAAAAAAAAAAA邑上苑热计量改造项目",
    "description" : "世AA邑上苑热计量改造项目",
    "createAt" : "2012-01-01",
    "updateAt" : "2012-01-01"
}]



[{"id":4,"clientName":"北京永安热力有限公司","description":"United States","year":2008,"contractAt":"24/08/2008","projectName":"世涛天朗、邑上苑热计量改造项目","contractNum":"ZBS2021-001-003","silver":2,"bronze":3,"contractAmount":3896830}]


### nodejs
    brew install node
    npm install npm -g
    node -v
    npm install -g @angular/cli
    ng -v

### angular app
    ng new my-app
    cd my-app
    ng serve --open
    ng serve --port 8080

    Angular的依赖注入等概念、Rxjs库的使用

### tomcat 终端打开和关闭：
    打开：
    cd 到tomcat的bin目录下：sudo ./startup.sh
    关闭：
    cd 到tomcat的bin目录下：sudo ./shutdown.sh

### fix mysql "message from server: "Host '172.18.0.3' is not allowed to connect to this MySQL server"
    docker ps
    docker exec -it 7a8bb5080e99 /bin/bash
    > mysql -u root -p
    > use mysql
    > GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
    > FLUSH PRIVILEGES;
    > exec sql string in queries-1.sql under /java-bookstore, to create database
        ctrl+c, stop docker
    docker-compose up           //to load up docker again after db creation

### how to deploy onto server in Cloud
    using ftp
    open the port
    put jar file onto the server

    any remote desktop?
