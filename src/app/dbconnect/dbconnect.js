import mongoose from "mongoose";

const connection = {};

async function dbConnect() {

     if (connection.isConnected) {
          console.log("ALready connected to Database");
          return;
     }
     try {
          const db = await mongoose.connect(process.env.MongoDb_url);
          connection.isConnected = db.connections[0].readyState;
          console.log("connected to database");
     } catch (error) {
          console.log("something wents wrong in db connection");
     }
}

export default dbConnect;
