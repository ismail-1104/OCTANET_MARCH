const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ismail-1104:shaikh786@todo.y3zrjlb.mongodb.net/?retryWrites=true&w=majority&appName=Todo";

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Database connected successfully.");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
