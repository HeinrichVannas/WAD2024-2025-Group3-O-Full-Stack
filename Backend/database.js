const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "123", // Add your password
    database: "testWad",
    host: "localhost",
    port: "5432"
});

/*
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
An example of generated uuid:  32165102-4866-4d2d-b90c-7a2fddbb6bc8
*/

// Create users table
const createUserTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL
        );
`;

// Create posts table
const createPostsTblQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        postDate VARCHAR(200) NOT NULL,
        message VARCHAR(200) NOT NULL
        );
`;

const posts = [
    {
        date: "Oct 02, 2022",
        message: "This is a message."
    },
    {
        date: "Oct 03, 2022",
        message: "yup"
    },
    {
        date: "Oct 04, 2022",
        message: "good"
    },
];

// Function to execute queries with optional parameters
const execute = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
};

// Insert query with parameterized inputs
const addPostsQuery = `
    INSERT INTO "posts" (postDate, message)
    VALUES ($1, $2);
`;

// Function to create tables and insert posts
const setupDatabase = async () => {
    try {
        // Create tables
        await execute(createUserTblQuery);
        console.log('Table "users" is created');
        await execute(createPostsTblQuery);
        console.log('Table "posts" is created');

        // Insert posts
        for (const post of posts) {
            await execute(addPostsQuery, [post.date, post.message]);
            console.log(`Post with message "${post.message}" was added.`);
        }
    } catch (error) {
        console.error('Error setting up database:', error);
    }
};

// Run the setup
setupDatabase();
module.exports = pool;