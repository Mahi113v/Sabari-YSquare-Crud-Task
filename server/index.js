//package require
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyparser = require("body-parser");
const database = require("mysql");
const {application,request,response}=require("express");

const add=express();
add.use(cors());
add.use(fileupload());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static("public"));

//database connection
let a=database.createConnection({
    host:"localhost",
    user:"root",
    password:"Sarun@123",
    database:"node_db"
});

a.connect(function(error){
    if(error){
        console.log(error);
    } else {
        console.log("db is connected")
        }
});

//api integrations

add.get('/',(request,response)=>{
    const sql = "select * from student_details";
    a.query(sql,(err,result)=>{
        if(err){
            return response.json({Message:"inside server error"})
         } else {
            return response.json(result);
         }
    })
})

//student details insert api
add.post('/studentInsert',(request,response)=>{
    const sql = "insert into student_details(student_name,student_email,student_password,student_gender,language) values (?,?,?,?,?)";
    const {student_name,student_email,student_password,student_gender,language}=request.body;
    a.query(sql,[student_name,student_email,student_password,student_gender,language],(err,result)=>{
        if(err){
            return response.json(err);
        } else{
            return response.json(result);
        }
    })
})

//student details read api
add.get('/studentGet/:id',(request,response)=>{
    const sql = "select * from student_details where id=?";
    const id = request.params.id;
    a.query(sql,[id],(err,result)=>{
        if(err){
            return response.json({Message:"inside server error"})
         } else {
            return response.json(result);
         }
    })
})


//student details update api
add.put('/studentUpdate/:id',(request,response)=>{
    const sql='update student_details set student_name=?,student_email=?,student_password=?,student_gender=?,language=? where id=?';
    const id=request.params.id;
    const{student_name,student_email,student_password,student_gender,language}=request.body;
    a.query(sql,[student_name,student_email,student_password,student_gender,language,id],(err,result)=>{
        if(err){
            return response.json({Message:"inside server error"})
         } else {
            return response.json(result);
         }
    })
})

//student details delete api
add.delete('/studentDelete/:id',(request,response)=>{
    const sql = "delete from student_details where id=?";
    const id=request.params.id;
    a.query(sql,[id],(err,result)=>{
        if(err){
            return response.json({Message:"inside server error"})
         } else {
            return response.json(result);
         }   
    })
})

//port connecting
add.listen(33,()=>{
    console.log('server is running on 33 port');
})