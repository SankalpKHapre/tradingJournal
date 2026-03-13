const bcrypt=require("bcrypt");
const express_validator= require("express-validator");
const jwt= require("jsonwebtoken");
const db =require('../dB_config/config');

const register = async(req,res)=>{

    try {
        const {email,password} = req.body
        const hashedpassword = await bcrypt.hash(password,10);
        await db.query("INSERT INTO users_trade(email,password_hash) VALUES(?,?)",[email,hashedpassword])
        res.json({message:"User added succesfully",
            email:email
        })
    } catch (error) {
        console.error(error);
        res.status(500).json("Error adding user"); 
    }
}

const login = async(req,res)=>{
    try {
        const{email,password}=req.body;
        const [rows] = await db.query('SELECT email,password_hash,id from users_trade WHERE email=?',[email]);
        if (rows.length==0) {
            console.log("user not found")
            return res.status(404).json({message:"User not found"});
        }
        let verifyPassword
        verifyPassword = await bcrypt.compare(password,rows[0].password_hash);
        if (verifyPassword) {
            const token =jwt.sign({id:rows[0].id}, process.env.JWT_SECRET, {expiresIn:"10h"})
            res.json({"token":token,message:"User Login Succesfully"})  
        }
        else{
            res.status(401).json({ErroMessage:"Invalid Crredentials"})
        }
    } catch (error) {
        res.status(500).json({"Error":error.message})
        
    }

}


module.exports={register,login}