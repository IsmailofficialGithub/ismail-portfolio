import mongoose from "mongoose";

const connection = {};

async function dbConnect() {

     if (connection.isConnected) {
          console.log("ALready connected to Database");
          return;
     }
     try {
          const uri = process.env.MongoDb_url;
          if (!uri) {
               throw new Error("MongoDB connection string is not defined in environment variables");
          }
          const db = await mongoose.connect(uri);
          connection.isConnected = db.connections[0].readyState;
     } catch (error) {
          console.log("something wents wrong in db connection", error);

     }
}

export default dbConnect;
