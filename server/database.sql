CREATE DATABASE myexample;

CREATE TABLE notifications(
    noti_id SERIAL PRIMARY KEY,
    noti_text VARCHAR(500),
    date_str VARCHAR(100)
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    text VARCHAR(500),
    picture BYTEA,
    account VARCHAR(50),
    date_str VARCHAR(100)
);

CREATE TABLE comments(
    cmt_id SERIAL PRIMARY KEY,
    text VARCHAR(500),
    account VARCHAR(50),
    post_id INT,
    CONSTRAINT fk_post
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
    ON DELETE CASCADE
);

CREATE TABLE lectures(
    lec_id SERIAL PRIMARY KEY,
    lecture VARCHAR(100),
    name VARCHAR(100),
    description VARCHAR(500),
    date_str VARCHAR(100)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    userAva VARCHAR(100)
);
