const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://nisharg:nisharg123@cluster0.kmgjdjo.mongodb.net/ecommerce"
    )
    .then((data) => {
      console.log(`Mongodb Connected with server: ${data.connection.host}`);
    }).catch((err)=>{
      console.log(err);
    });
};

module.exports = connectDatabase;
