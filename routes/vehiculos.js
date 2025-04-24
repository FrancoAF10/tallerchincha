const express=require('express')
const router =express.Router()
const db=require('../config/database')

router.get('/',async(req,res)=>{

  try{
    const query=` SELECT V.idvehiculo,
      M.marca,
      V.modelo,
      V.color,
      V.combustible,
      V.afabricacion,
      V.condicion FROM vehiculos V INNER JOIN marcas M ON V.idmarca=M.idmarca`;
    const [vehiculos]=await db.query(query)
        //res.send(vehiculos)
    res.render('index',{vehiculos})
  }catch(error){
    console.error(error)
  }
})
router.get('/create',async(req,res)=>{
  try{
    res.render('create')
  }catch(error){
    console.error(error)
  }
})


module.exports=router