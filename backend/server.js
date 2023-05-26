const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
    origin:"http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) =>{
    res.json({message:"welcont to backend API"})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Server is running on prot ${PORT}.`);
});


const db  = require("./app/models");
//const Role = db.role;

// db.sequelize.sync({force:true}).then(()=>{
//     console.log('Drop and Resync Db');
//     initial();
// });
// function initial(){
//     Role.create({
//         id:1,
//         name: "user"
//     });
//     Role.create({
//         id:2,
//         name: "moderateor"
//     });
//     Role.create({
//         id: 3,
//         name: "admin"
//     });   
// }

db.sequelize.sync();