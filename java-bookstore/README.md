# java-bookstore

## my sql database

```
mysql -u root -p
show databases;

use springbootapps;
DROP TABLE IF EXISTS  tbl_category;
DROP TABLE IF EXISTS  tbl_book;

drop database springbootapps;


mysql -u root -p

-- run sql script
source queries-1.sql

select * from tbl_book;
select * from tbl_category;
```

## run command below to generate docker image

```
docker build --build-arg JAR_FILE=build/libs/\*.jar -t su/bookstore .

docker run -p 8080:8080 -t su/bookstore

docker-compose -f stack.yml up --remove-orphans
```

