const express = require('express');
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./router")
const port = 5000;


app.use(express.json());
app.use(cors());

app.use("/uploads",express.static("./uploads"))
app.use(router)

app.listen(port,()=>{
    console.log("server start")
})


 



