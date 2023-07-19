const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const Post = require("./models/post");
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sameer4247:%40047Sam_007@cluster0.vrornbf.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const router = require("./Routes/posts");
// mongoose
//   .connect(
//     "mongodb+srv://sameer4247:%40047Sam_007@cluster0.vrornbf.mongodb.net/?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
connectDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-header",
  //   "Origin, x-Requested-with,content-Type,Accept"
  // );
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  // );
  next();
});
app.use("/api/posts", router);

module.exports = app;
