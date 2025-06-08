CREATE DATABASE todo_app; 

CREATE TABLE todo(
    todo_ids SERIAL PRIMARY KEY, 
    description VARCHAR(255), 
    completed BOOLEAN DEFAULT FALSE
    priority INTEGER DEFAULT 1 CHECK(priority BETWEEN 1 AND 5) ; 
);