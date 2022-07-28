import express from "express";
import pg from "pg";

const app = express();
app.use(express.json());

const pool = new pg.Pool({
    database: "petshop",
})

app.get("/pets", (req, res) =>{
    pool.query("SELECT * FROM pets").then((data)=>{
        if(data.rows){
            res.send(data.rows);
        }else{
            res.sendStatus(404);
        }
    });
});



app.get("/pets/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM pets WHERE id = $1;`, [id]).then((data)=>{
        const pet = data.rows[0];
        if(pet){
            res.send(pet);
        }else{
            res.sendStatus(404);
        }
    });
});

app.post("/pets", (req, res) => {
    const { age, kind, name } = req.body;
    pool
      .query(
        "INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3) RETURNING *",
        [age, kind, name]
      )
      .then((result) => {
        res.send(result.rows[0]);
      });
  });

app.patch("/pets/:id", (req, res) => {
    const id = Number(req.params.id);
    const { age, kind, name } = req.body;
    if (Number.isNaN(id)) {
      res.status(400).send(`invalid id given "${req.params.id}"`);
    }
    pool
      .query(
        `
        UPDATE pets
        SET age = COALESCE($1, age),
            kind = COALESCE($2, kind),
            name = COALESCE($3, name)
        WHERE id = $4
        RETURNING *;
        `,
        [age, kind, name, id]
      )
      .then((result) => {
        if (result.rows.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(result.rows[0]);
        }
      });
});


app.delete('/pets/:id', (req, res)=>{
    const id = req.params.id;
    pool.query("DELETE FROM pets WHERE id = $1;", [id]).then((data) => {
        if(data.rows.length === 0){
            res.sendStatus(404);
        }else{
            res.sendStatus(204);
        }
    });
});

app.use((err, req, res, next)=>{
    res.sendStatus(500);
})

app.listen(4000,()=>{
    console.log("port is running on 4000")
})