import express from "express";
import mongoose from "mongoose";
import videos from "./dbModel.js";
//3gnMVQWVBejNUDIk

// App Config
const app = express();
const port = 9000;

const connection_url =
  "mongodb+srv://admin:3gnMVQWVBejNUDIk@cluster0.xa7zr.mongodb.net/tiktokDB?retryWrites=true&w=majority";

// MiddleWare
app.use(express.json());
app.use((req, res, next) => {
  res.setHeaders("Access-Control-Allow-Origin", "*"),
    res.setHeaders("Access-Control-Allow-Headers", "*"),
    next();
});

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Api Endpoint
app.get("/", (req, res) => {
  res.send("Hello world !!!");
});

app.post("/v2/posts", (req, res) => {
  // adding data to database
  const dbVideo = req.body;
  // creating a post request it will add data to the database using schema
  videos.create(dbVideo, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/v2/posts", (req, res) => {
  // creating a post request it will add data to the database using schema
  videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => {
  console.log("Listening on " + port);
});
