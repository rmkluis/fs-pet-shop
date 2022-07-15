import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  let index = req.url.split("/")[2];
  fs.readFile("pets.json", "utf-8", (err, data) => {
///////////GET
    if (req.url === "/pets" && req.method === "GET") {
        res.writeHead(200, {'Content-Type': "application/json"})
        res.end(data)
    } else if (req.url === `/pets/${index}` && req.method === "GET" && index >= 0 && index < JSON.parse(data).length) {
        res.writeHead(200, {'Content-Type': "application/json"})
        res.end(JSON.stringify(JSON.parse(data)[index]))
    } else if(req.method === "GET"){
        // console.log(req.url);
        res.writeHead(404, {'Content-Type': "text/plain"})
        res.end(err)
///////////POST
    // } else if(req.method === "POST" && req.url === "/pets"){
    //     // let body = ''
    //     let existingPets = JSON.parse(data);
    //     console.log(process.argv[1])
    //     // let newPet = `{"age":"${process.argv[3].split('=')[1]}","kind":"${process.argv[4].split('=')[1]}","name": "${process.argv[5].split('=')[1]}"}`;
    //     // existingPets.push(newPet)
    //     fs.writeFile('pets.json', JSON.stringify(data, existingPets), ()=>{;
    //     res.writeHead(200, {'Content-Type': "application/json"})
    //     res.end(JSON.stringify(existingPets))
    //   })};
}})});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
