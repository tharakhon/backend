const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const imageFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null,true);
  }else{
    cb('Please upload only images',false);
  }
}
const connection = mysql.createConnection({
    host    :'127.0.0.1',
    user    :'root',
    password:'',
    port    :'3307',
  database: 'testweb'
});

connection.connect(error => {
  if (error) {
    console.log('Error connecting to database: ', error);
  } else {
    console.log('Connected to database!');
  }
});
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM test_check';

  connection.query(sql, (error, results) => {
    if (error) {
      console.log('Error fetching data: ', error);
      res.status(500).json({
        error: error
      });
    } else {
      res.json({
        results
      });
    }
  });
});
app.get('/api/data/register', (req, res) => {
  const sql = 'SELECT * FROM test_main';

  connection.query(sql, (error, results) => {
    if (error) {
      console.log('Error fetching data: ', error);
      res.status(500).json({
        error: error
      });
    } else {
      res.json({
        results
      });
    }
  });
});
app.post('/api/create',(req,res) => {
  
  const id = Math.floor(Math.random() * 100);
  const username = req.body.username
  const lastname = req.body.lastname
  const email = req.body.email
  const value = [id,username,lastname,email]
  const sql = `INSERT INTO user(id,username, lastname, email) VALUE (?,?,?,?)`;
  connection.query(sql,value,(err, result) => {
    if(err){
      console.log('Error fetching data: ', err);
      res.status(500).json({
        error: err
      });
    }else{
      res.status(200).json({
        result: "บันทึกข้อมูล",
        query: sql,
        data: {
          value
        }
      });
    }
  })
})

app.post('/api/save-data',(req,res) => {
  const id = req.body.id
  const age = req.body.age
  const quantity = req.body.quantity
  const price = req.body.price
  const priceHome = req.body.priceHome

  const value = [id,age,quantity,price,priceHome]
  const sql = `INSERT INTO test_input(id,age,quantity, price,pricehome) VALUE (${parseInt(id)}, '${age}', ${quantity}, ${price}, ${priceHome})`;
  connection.query(sql,value,(err, result) => {
    if(err){
      console.log('Error fetching data: ', err);
      res.status(500).json({
        error: err
      });
    }else{
      res.status(200).json({
        result: "บันทึกข้อมูล",
        query: sql,
        data: {
          value
        }
      });
    }
  })
})

app.post('/api/save-data1',(req,res) => {
  
  const id = Math.floor(Math.random() * 100);
  const age = req.body.age
  const bank = req.body.bank
  
  

  const value = [id,age,bank]
  const sql = `INSERT INTO test_input1(id,age,bank) VALUE (?,?,?)`;
  connection.query(sql,value,(err, result) => {
    if(err){
      console.log('Error fetching data: ', err);
      res.status(500).json({
        error: err
      });
    }else{
      res.status(200).json({
        result: "บันทึกข้อมูล",
        query: sql,
        data: {
          value
        }
      });
    }
  })
})
app.post('/api/save-data2',(req,res) => {
  
  const id = Math.floor(Math.random() * 100);
  const nameL = req.body.nameL
  const Location = req.body.Location
  const phone = req.body.phone
  const time1 = req.body.time1
  const time2 = req.body.time2
  
  
  

  const value = [id,nameL,Location,phone,time1,time2]
  const sql = `INSERT INTO test_main(id,nameL,Location,phone,time1,time2) VALUE (?,?,?,?,?,?)`;
  connection.query(sql,value,(err, result) => {
    if(err){
      console.log('Error fetching data: ', err);
      res.status(500).json({
        error: err
      });
    }else{
      res.status(200).json({
        result: "บันทึกข้อมูล",
        query: sql,
        data: {
          value
        }
      });
    }
  })
})

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});


