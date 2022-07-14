import fs from "fs";

const subcommand = process.argv[2];
const index = process.argv[3];
let index2 = process.argv[4];
let index3 = process.argv[5];
let index4 = process.argv[6];

// console.log(index >= 0)

switch (subcommand) {
  case "read": {
    fs.readFile("pets.json", "utf-8", (err, str) => {
      const data = JSON.parse(str);
      if (index >= 0 && index <= JSON.parse(str).length - 1) {
        console.log(data[index]);
      } else if (index == undefined) {
        console.log(data);
      } else if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.error(`Usage: node pets.js read ${index}`);
        process.exit(1);
      }
    });
    break;
  }
  case "create": {
    fs.readFile("pets.json", "utf-8", (err, str) => {
      const data = JSON.parse(str);
      if (index3 != undefined) {
        fs.writeFile("pets.json", JSON.stringify(data, data.push({ age: parseInt(index), kind: index2, name: index3 })), (err) => {
            console.log(data);
          }
        );
      } else if (err) {
        console.log(err);
      } else {
        console.error("Usage: node pets.js create AGE KIND NAME");
      }
    });
    break;
  }
  case "update": {
    fs.readFile("pets.json", "utf-8", (err, str) => {
        const data = JSON.parse(str);
        if (index3 != undefined) {
          fs.writeFile("pets.json", JSON.stringify(data, data[index] = { age: parseInt(index2), kind: index3, name: index4 }), (err) => {
              console.log(data);
            }
          );
        } else if (err) {
          console.log(err);
          process.exit(1);
        } else {
          console.error("Usage: node pets.js update INDEX AGE KIND NAME");
          process.exit(1);
        }
      });
      break;
  }
  case "destroy": {
    fs.readFile("pets.json", "utf-8", (err, str) => {
        const data = JSON.parse(str);
        data.splice(index, 1);
        if (index != undefined && index2 == undefined) {
          fs.writeFile("pets.json", JSON.stringify(data), (err) => {
              console.log(data);
            }
          );
        } else if (err) {
          console.log(err);
          process.exit(1);
        } else {
          console.error("Usage: node pets.js destroy INDEX");
          process.exit(1);
        }
      });
      break;
  }
  default: {
    console.error("Usage: node pets.js [read | create | update | destroy]");
  }
}
