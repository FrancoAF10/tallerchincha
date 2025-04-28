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
//ruta para acceder a la vista creacion de vehiculos
router.get('/create',async(req,res)=>{
  try{
    const [datos]= await db.query("SELECT * FROM marcas")
    res.render('create',{marcas:datos})
  }catch(error){
    console.error(error)  
  }
})
//esta ruta renderiza el fomrulacio d eedición, para ello se debe identidificar el vehiculo
router.get('/edit/:id',async(req,res)=>{
  try{
    const [datos]= await db.query("SELECT * FROM marcas")
    const [registro]=await db.query("SELECT * FROM vehiculos WHERE idvehiculo=?",[req.params.id])
    if(registro.length>0){
      res.render('edit',{marcas:datos,vehiculo:registro[0]})
     }else{
      res.redirect('/')
    }
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
//Proceso e actualización de datos
router.post('/edit/:id',async (req,res)=>{
  try{
    //obtener los datos
    const {marcas,modelo,color,combustible,afabricacion,condicion}=req.body
    //Actializar registro
    await db.query("UPDATE vehiculos SET idmarca=?,modelo=?,color=?,combustible=?, afabricacion=?, condicion=? WHERE idvehiculo=?", 
      [marcas,modelo,color,combustible,afabricacion,condicion,req.params.id])
    res.redirect('/')
  }catch(error){
    console.error(error)
  }
})  


//Eliminación
router.get('/delete/:id',async(req,res)=>{
try{
  //Datos que ingresan por el <form></form> req.body
  //DAtos que ingresan por el GET/URL req.params.atributo
const resultado=await db.query('DELETE FROM vehiculos WHERE idvehiculo=?',[req.params.id])
//res.send(resultado)
res.redirect('/')

}catch(error){
console.error(error)
}
})

module.exports=router