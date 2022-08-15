### Steps to run the app:
1. Copy the [env file](./.env) into a new file `.local.env` with necessary credentials
2. `yarn start` to start the service
3. `yarn test` to run tests

### Steps to Install, start and configure MySQL:
#### General commands:
1. `brew services start mysql`
2. `mysql_secure_installation` and configure password for root user
3. `brew services stop mysql`
4. `mysql.server start` and `mysql.server stop` to start and stop mysql respectively

#### Login, configure new database and new user
5. `mysql -u root -p` login as root user
6. `CREATE DATABASE url_shortener_db;` creates a database for our app
7. `USE url_shortener_db;` check and see if we can use the database
8. `mysql -h localhost -u root -p url_shortener_db` logout and login again as root user and use the created database
9.  `CREATE USER 'url_shortener_user'@'localhost' IDENTIFIED BY '<enter password here>';` create new user
10. `GRANT ALL PRIVILEGES ON url_shortener_db.* TO 'url_shortener_user'@'localhost';` grant this user all the privileges for the database
11. `mysql -h localhost -u url_shortener_user -p` login as newly created user


### APIs:
1. `/url`: POST URL and retrieve an already existing or new short link
2. `/url/:shortUrl`: GET call to simulate user visiting short link
3. `/stats/:shortUrl`: GET stats of the short link