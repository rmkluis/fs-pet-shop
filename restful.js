import express from "express";
import fs from "fs";
const app = express();
app.use(express.json());


fs.readFile("pets.json", "utf-8", (err, data) => {
    let deets = JSON.parse(data);
    //Request all pets
    app.get("/pets", (req, res) => {
        res.type("text");
        res.send(JSON.parse(data));
    });
    //Request pets at id
    app.get("/pets/:id", (req, res) => {
        let { id } = req.params;
        res.type("application/json");
        if (JSON.parse(data)[id]) {
            res.send(JSON.parse(data)[id]);
        } else {
            res.status(404);
            res.type("text");
            res.send(`Not Found`);
        }
    });
    //Post pet
    app.post("/pets", (req, res, next) => {
        if (parseInt(req.body.age) && req.body.kind && req.body.name) {
            req.body.age = parseInt(req.body.age);
            deets[deets.length] = req.body;
            fs.writeFile("pets.json", JSON.stringify(deets), (err) => {
                res.send(JSON.stringify(deets));
            });
        } else {
            res.type("text").status(400).send("Bad Request");
        }
    });
    //Update field
    app.patch("/pets/:id", (req, res) => {
        let { id } = req.params;
        console.log(Object.keys(req.body))
        if (parseInt(req.body.age)) {
            deets[id].age = req.body.age;
        }
        if (req.body.kind) {
            deets[id].kind = req.body.kind;
        }
        if (req.body.name) {
            deets[id].name = req.body.name;
        }
        fs.writeFile("pets.json", JSON.stringify(deets), (err) => {
            res.send(JSON.stringify(deets[id]));
            if(err){res.status(400).type("text").send("Bad Request")}
        });
    });
    //Delete pet
    app.delete("/pets/:id", (req, res)=>{
        let { id } = req.params;
        deets.splice(id, 1)
            fs.writeFile("pets.json", JSON.stringify(deets), (err) => {
                res.send(JSON.stringify(deets));
            });
    })
});


app.listen(3000, () => {
    console.log("listening on port 3000");
  });


  //id >= deets.length ||
  //{res.status(400).type("text").send("Bad Request")}