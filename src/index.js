import  express  from "express";
import bluebird from "bluebird";
import {createConnection} from "mysql";
import cors from "cors";

const connectionm ={
    host : "localhost",
    user : "root",
    password : "mayuresh21",
    database : "mayu",
  };

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

/* http://localhost:3002/ */
app.get("/", (req,res) => res.send("hello kasturi"));


/* http://localhost:3002/messages */
app.get("/messages", async(req,res) => {
      let list =[];
      let connection = createConnection(connectionm);
      bluebird.promisifyAll(connection);

      await connection.connectAsync();

      let sql = `SELECT * FROM mayur`;
     let results = await connection.queryAsync(sql);

      await connection.endAsync();

      

    res.json(results);

});

/* http://localhost:3002/message */
app.post("/message",async(req,res) => {

    let connection = createConnection(connectionm);
      bluebird.promisifyAll(connection);

      await connection.connectAsync();
      
      let id = req.body.id;
      let name = req.body.name;
      //let sql = `insert into mayur(id,name) values ('${id}','${name}')`;
      let sql = `insert into mayur(id , name) values (? , ?)`;
      let results = await connection.queryAsync(sql,[id , name]);
      await connection.endAsync();

    let output = {msg :"Record created successfully"};
    res.json(output);
});

app.listen(3002);