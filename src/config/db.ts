import consola  from "consola";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/Works", {
      useUnifiedTopology: true,
      useNewUrlParser   : true,
      useCreateIndex    : true,
      useFindAndModify  : true
    });
    consola.success("Connected to DB");
  } catch (error) {
    consola.error("Could not connect to DB", error);
    process.exit(1);
  }
};