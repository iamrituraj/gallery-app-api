const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const Datastore = require("nedb");


app.use(express.json());

const db = new Datastore("../gallery-app/db/data.db");

db.loadDatabase();

app.get("/api/images", async (req, res) => {
  console.log("hi");
  try {
    db.loadDatabase();

    db.find({}, (err, data) => {
      res.status(200).json(data);
    })
  }

  catch (err) {

    return res.status(500).json(err);
  }
});

app.get("/api/images/:id", async (req, res) => {
  try {
    db.loadDatabase();
    db.find({ _id: req.params.id }, (err, data) => {
      res.status(200).json(data);
    });
  } catch (err) {

    return res.status(500).json(err);
  }
});


app.post("/api", async (req, res) => {
  try {
    db.loadDatabase();
    const data = req.body;

    db.insert(data, (err) => {
      res.status(200).json("ok");
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});


app.put("/api/:id/edit", async (req, res) => {
  try {
    db.loadDatabase();
    const data = req.body;
       console.log(data);
    db.update(
      { _id: req.params.id },
      { ImgName:req.body.ImgName , ImgUrl: req.body.ImgUrl, ImgDetails: req.body.ImgDetails },
      { multi: false },
      (err) => {
        res.status(200).json("ok");
      }
    );

    db.loadDatabase();

  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    db.loadDatabase();
    const data = req.body;

    db.remove({ _id: req.params.id }, (err) => {
      res.status(200).json("ok");
    });
    db.loadDatabase();

  } catch (err) {

    return res.status(500).json(err);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
});
