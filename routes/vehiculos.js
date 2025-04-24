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
    const [datos]= await db.query("SELECT * FROM marcas")
    res.render('create',{marcas:datos})
  }catch(error){
    console.error(error)  
  }
})

router.post('/create',async (req,res)=>{
  try{
    //obtener los datos
    const {marcas,modelo,color,combustible,afabricacion,condicion}=req.body
    //guardar datos
    await db.query(`INSERT INTO VEHICULOS (idmarca,modelo,color,combustible,afabricacion,condicion) VALUES(?,?,?,?,?,?)`,
      [marcas,modelo,color,combustible,afabricacion,condicion])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})  


module.exports=router