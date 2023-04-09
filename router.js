const express = require("express");
const router = new express.Router();
const conn = require("./db/conn");
const multer = require("multer");
const moment = require("moment")


// img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})



// register userdata
router.post("/register",upload.single("photo"),(req,res)=>{
    const {fname} = req.body;
    const {filename} = req.file;

  
    if(!fname || !filename){
        res.status(422).json({status:422,message:"fill all the details"})
    }
    
    try {
        
        let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        
        conn.query("INSERT INTO images SET ?",{
            username:fname,
            userimg:filename,
            date:date},(err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log("data added")
                res.status(201).json({status:201,data:req.body})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});


// get user data
router.get("/getdata",(req,res)=>{
    try {
        conn.query("SELECT * FROM images",(err,result)=>{
          if(err){
            console.log("error")
        }else{
            console.log("data get")
            res.status(201).json({status:201,data:result})
        }
            
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});


// delete user
router.delete("/:id",(req,res)=>{
    const {id} = req.params;
   try {
    conn.query(`DELETE FROM usersdata WHERE id ='${id}'`,(err,result)=>{
        if(err){
            console.log("error")
        }else{
            console.log("data delete")
            res.status(201).json({status:201,data:result})
        }
    })
   } catch (error) {
    res.status(422).json({status:422,error})
   }
})
router.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM test_check';
 
    conn.query(sql, (error, results) => {
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
  router.get('/api/data/register', (req, res) => {
    const id = req.query.id
    const sql = `SELECT * FROM test_main where id='${id}'`;
 
    conn.query(sql, (error, results) => {
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
  router.post('/api/create',(req,res) => {
   
    const id = Math.floor(Math.random() * 100);
    const username = req.body.username
    const lastname = req.body.lastname
    const email = req.body.email
    const value = [id,username,lastname,email]
    const sql = `INSERT INTO user(id,username, lastname, email) VALUE (?,?,?,?)`;
    conn.query(sql,value,(err, result) => {
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
 
  router.post('/api/save-data',(req,res) => {
    const id = req.body.id
    const age = req.body.age
    const quantity = req.body.quantity
    const price = req.body.price
    const priceHome = req.body.priceHome
 
    const value = [id,age,quantity,price,priceHome]
    const sql = `INSERT INTO test_input(id,age,quantity, price,pricehome) VALUE (${parseInt(id)}, '${age}', ${quantity}, ${price}, ${priceHome})`;
    conn.query(sql,value,(err, result) => {
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
 
  router.post('/api/save-data1',(req,res) => {
   
    const id = Math.floor(Math.random() * 100);
    const age = req.body.age
    const bank = req.body.bank
    const value = [id,age,bank]
    const sql = `INSERT INTO test_input1(id,age,bank) VALUE (?,?,?)`;
    conn.query(sql,value,(err, result) => {
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
  router.post('/api/save-data2',(req,res) => {
   
    const id = Math.floor(Math.random() * 100);
    const nameL = req.body.nameL
    const Location = req.body.Location
    const phone = req.body.phone
    const time1 = req.body.time1
    const time2 = req.body.time2
    const value = [id,nameL,Location,phone,time1,time2]
    const sql = `INSERT INTO test_main(id,nameL,Location,phone,time1,time2) VALUE (?,?,?,?,?,?)`;
    conn.query(sql,value,(err, result) => {
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
  router.post('/api/save-data3',(req,res) => {
    const marker = req.body.marker
    const markers = req.body.markers
    const gender = req.body.gender
    const genders = req.body.genders
    const address = req.body.address
    const value = [marker,markers,gender,genders,address]
    const sql = `INSERT INTO mapapi(marker,markers,gender,genders,address) VALUE (?,?,?,?,?)`;
    conn.query(sql,value,(err, result) => {
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

module.exports = router;