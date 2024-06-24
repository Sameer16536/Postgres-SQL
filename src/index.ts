//write a function to create users table in your database
import { error } from "console";
import { Client } from "pg";
import { configDotenv } from 'dotenv'

configDotenv()

// const client = new Client({
//     host:'',
//     port:5334,
//     database:'test',
//     password:'5TdlAxfFgC9n'
// })
const client = new Client({
    connectionString: process.env.URL
})

//Create table
const createUsersTable = async () => {

    await client.connect();
    const result = await client.query(`
            CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`)

    console.log(result)
}

const createAddressTable = async()=>{
    await client.connect;
    const result =await client.query(`CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`)
    console.log(result)
}

//Insert data
const insertData = async (username: string, email: string, password: string) => {

    //SQL Injection issue for this code:
    // try{
    //     await client.connect()
    //     const insertQuery = `INSERT INTO users (username,email,password)
    //                                     VALUES('Sameer69','sameermarathe69@gmail.com','Sameer@2003')`
    //     const res = await client.query(insertQuery)
    //     console.log("Insertion successful ",res)
    // }catch(err){
    //     console.error('Error during insertion ',err)

    // }finally{
    //     await client.end()
    // }

    //Solution::
    try {
        await client.connect()
        // Use parameterized query to prevent SQL injection
        const insertQuery = `INSERT INTO users(username,email,password) VALUES($1,$2,$3)`
        const values = [username, email, password]
        const res = await client.query(insertQuery, values)
        console.log('Insertion success:', res); // Output insertion result


    } catch (error) {
        console.error(error)
    } finally {
        await client.end()
    }

}

//getuser
const getUser = async(email:string)=>{
    try{
        await client.connect()
        const query = `SELECT * FROM users WHERE email=$1`
        const values = [email]
        const result = await client.query(query,values)
        
        if(result.rows.length > 0){
            console.log("User found",result.rows[0])
            return result.rows[0]
        }
        else {
            console.log('No user found with the given email.');
            return null; // Return null if no user was found
          }
        } catch (err) {
          console.error('Error during fetching user:', err);
          throw err; // Rethrow or handle error appropriately
        } finally {
          await client.end(); // Close the client connection
        }


}
const insertAddresses = async(user_id:number,city:string,country:string,street:string,pincode:string)=>{
    await client.connect()
    const query = `INSERT INTO addresses (user_id, city, country, street, pincode)
    VALUES ($1,$2,$3,$4,$5);`
    const values = [user_id,city,country,street,pincode]
    const res = await client.query(query,values)
    console.log(res)
    await client.end()
}
const getUserDetailsandAddresses = async(userId:string)=>{
    try{
        await client.connect()
        const query =`
        SELECT u.id , u.username ,u.email , a.city , a.country, a.street , a.pincode
        FROM users u
        JOIN addresses a ON u.id = a.user_id
        WHERE u.id= 1`
        const res = await client.query(query)
        console.log(res)
}
catch(err){
    console.log(err)
}
finally{
    await client.end()
}
}


// createUsersTable()
// createAddressTable()
// insertData()
// insertData('username5', 'user5@example.com', 'user_password').catch(console.error);
// insertAddresses(1, 'New York', 'USA', '123 Broadway St', '10001')
// getUser('sameermarathe15@gmail.com')
getUserDetailsandAddresses("1")