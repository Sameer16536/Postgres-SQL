## Postgres SQL practice

## Connection string :
-- postgresql://test_owner:passWord?n@ep-rough-sunset-a5i476u8.us-east-2.aws.neon.tech/test?sslmode=require

## use Pg or pqsql
1. psql
psql is a terminal-based front-end to PostgreSQL. It provides an interactive command-line interface to the PostgreSQL (or TimescaleDB) database. With psql, you can type in queries interactively, issue them to PostgreSQL, and see the query results.
--How to connect to your database?
psql Comes bundled with postgresql. You don’t need it for this tutorial. We will directly be communicating with the database from Node.js

psql -h p-broken-frost-69135494.us-east-2.aws.neon.tech -d database1 -U 100xdevs

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


 1. CREATE TABLE users
        CREATE TABLE users: This command initiates the creation of a new table in the database named users.
 2. id SERIAL PRIMARY KEY
        id: The name of the first column in the users table, typically used as a unique identifier for each row (user). Similar to _id in mongodb
        SERIAL: A PostgreSQL-specific data type for creating an auto-incrementing integer. Every time a new row is inserted, this value automatically increments, ensuring each user has a unique id.
        PRIMARY KEY: This constraint specifies that the id column is the primary key for the table, meaning it uniquely identifies each row. Values in this column must be unique and not null.
 3.  email VARCHAR(255) UNIQUE NOT NULL,
        email: The name of the second column, intended to store the user's username.
        VARCHAR(50): A variable character string data type that can store up to 50 characters. It's used here to limit the length of the username.
        UNIQUE: This constraint ensures that all values in the username column are unique across the table. No two users can have the same username.
        NOT NULL: This constraint prevents null values from being inserted into the username column. Every row must have a username value.
4. password VARCHAR(255) NOT NUL
        Same as above, can be non uniqye
 5. created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        created_at: The name of the fifth column, intended to store the timestamp when the user was created.
        TIMESTAMP WITH TIME ZONE: This data type stores both a timestamp and a time zone, allowing for the precise tracking of when an event occurred, regardless of the user's or server's time zone.
        DEFAULT CURRENT_TIMESTAMP: This default value automatically sets the created_at column to the date and time at which the row is inserted into the table, using the current timestamp of the database server

 
2. pg
pg is a Node.js library that you can use in your backend app to store data in the Postgres DB (similar to mongoose). We will be installing this eventually in our app.

       
password : 5TdlAxfFgC9
![alt text](image.png)
Benefits of using a join - 
Reduced Latency
Simplified Application Logic
Transactional Integrity
 
 ![alt text](image-1.png)
 ![alt text](image-2.png)