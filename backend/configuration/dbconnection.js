import mongoose from "mongoose";

export const dbconnect=async(uri)=> {
   await mongoose.connect(uri)
    .then(()=> console.log("Database Connected successfully"))
    .catch((error) => console.error(error))
}