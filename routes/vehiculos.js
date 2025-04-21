const express=require('express')
const router =express.Router()
const db=require('../config/database')

router.get('/',async(req,res)=>{
  const [vehiculos]=await db.query(`SELECT * FROM VEHICULOS`)
  res.send(vehiculos)
})

module.exports=router