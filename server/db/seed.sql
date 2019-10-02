DROP DATABASE IF EXISTS better;
CREATE DATABASE better;

\c better;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  body VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(username) VALUES
('allison'),
('peter_parker'),
('wolverine');
INSERT INTO messages(user_id, body) VALUES
(1,'Amazing to be here'),
(2,'life keeps getting better'),
(3,'You better watch it')
