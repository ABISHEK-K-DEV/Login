MySQl :


create database tea;
use tea;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Email VARCHAR(255) UNIQUE NOT NULL,
  UserName VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL
);

select * from users

install 