CREATE DATABASE todo_app; 

CREATE TABLE todo(
    todo_ids SERIAL PRIMARY KEY, 
    description VARCHAR(255), 
    completed BOOLEAN DEFAULT FALSE; 
);