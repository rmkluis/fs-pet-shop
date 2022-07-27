import express from "express";
import fs from "fs";
const app = express();
app.use(express.json());


fs.readFile('pets.json', 'utf-8', (err, data)=>{
    //Request all pets
app.get("/pets", (req, res)=>{
        res.type('text');
        res.send(JSON.parse(data))
})
    //Request pets at id
app.get("/pets/:id", (req, res)=>{
    let {id} = req.params;
        res.type('application/json');
        if(JSON.parse(data)[id]){
            res.send(JSON.parse(data)[id])
        } else {
            res.status(404)
            res.type('text')
            res.send(`Not Found`)
        }
})
    //Post pet 
app.post("/pets", (req, res) => {
    let deets = (JSON.parse(data))
    if(parseInt(req.body.age) && req.body.kind && req.body.name){
        req.body.age = parseInt(req.body.age)
        deets[deets.length] = req.body
        fs.writeFile("pets.json", JSON.stringify(deets), (err)=>{
            res.send(JSON.stringify(deets));
        })
    }else{
        res.type('text').status(400).send("Bad Request")
    }

})
})











app.listen(3000, () => {
    console.log('listening on port 3000')
})


//http GET localhost:3000/pets/0 
// http POST localhost:3000/pets 3 parakeet Charlie