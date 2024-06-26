const app = require("./app");
const dotenv = require("dotenv");
const cloudinary=require("cloudinary");
const connectDatabase = require("./config/database");
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Sutting down the server due to unhandled Uncaught Exception`);
  process.exit(1);
});

//Config
dotenv.config({ path: "backend/config/config.env" });
//Connecting to database
connectDatabase();  
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhanled Promise PromiseRejectionEvent
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Sutting down the server due to unhandled Promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
