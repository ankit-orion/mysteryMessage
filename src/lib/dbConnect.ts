import mongoose from "mongoose";

// connection object is used to store the connection status of the database
// isConnected is a number that represents the connection status
// 0: disconnected 1: connected 2: connecting 3: disconnecting 
// isConnected is not required to be set as it will be set by the function

type ConnectionObject = {
    isConnected?: number;
}

// here we are creating a connection object to store the connection status
// we are also creating a function that will connect to the database
// if the connection is already established, it will not try to connect again
const connection : ConnectionObject = {}

// dbConnect function is an async function that connects to the database
// it uses the mongoose.connect function to connect to the database
// it checks if the connection is already established before connecting
// if the connection is already established, it will log a message and return
// here promise<void> is used to indicate that the function does not return anything
// if the connection is successful, it will log a message and set the connection status
async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
        
    } catch(error){
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}
export default dbConnect;