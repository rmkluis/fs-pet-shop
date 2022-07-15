import express from "express";
import fs from "fs";

let app = express();

// .split('/')[2]

app.get("/pets" , function (req, res) {
    fs.readFile("pets.json", "utf-8", (err, str) => {
      const pets = JSON.parse(str);
        res.send(pets);
      })
  });

app.get("/pets/:id" , function (req, res) {
  fs.readFile("pets.json", "utf-8", (err, str) => {
    const pets = JSON.parse(str);
        if(req.params.id >= 0 && req.params.id < pets.length){
            res.send(pets[req.params.id]);
        }else{
            res.status(404).send('problem')
            res.set('Content-Type', 'text/plain')
        }
    })
});

app.use((err, req, res, next) => {
    if(err){
  res.send("stuff");
}});

app.listen(3000, function () {
  console.log("server is running");
});
