const Tarea=require('../models/Tarea');
const Proyecto=require('../models/Proyecto');
const {validationResult} =require("express-validator");



exports.crearTarea=async (req,res)=>{
    console.log("desde crear tarea");
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores:errors.array()});
    }

    
    try{
        const {proyecto}=req.body;
        const existeProyecto=await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg:"El proyecto no existe"});
        }

        if(existeProyecto.creador.toString()!==req.usuario.id){
            return res.status(401).json({msg:"No autorizado"});
        }

        const tarea=new Tarea(req.body);
        await tarea.save();
        return res.json({tarea});
    }catch(error){
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}

exports.obtenerTareas=async (req,res)=>{
    try{
        const {proyecto}=req.query;
        const existeProyecto=await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg:"El proyecto no existe"});
        }

        if(existeProyecto.creador.toString()!==req.usuario.id){
            return res.status(401).json({msg:"No autorizado"});
        }

        const tareas=await Tarea.find({proyecto}).sort({creado:-1});
        res.json({tareas});
    }catch(error){
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}

exports.actualizarTarea=async (req,res)=>{
    try{
        const {proyecto, nombre, estado}=req.body;

        let tarea=await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg:"La Tarea no existe"});
        }
        const existeProyecto=await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg:"El proyecto no existe"});
        }

        if(existeProyecto.creador.toString()!==req.usuario.id){
            return res.status(401).json({msg:"No autorizado"});
        }

        let nuevaTarea={};
        
        nuevaTarea.nombre=nombre;
        nuevaTarea.estado=estado;
        
        tarea=await Tarea.findOneAndUpdate({_id:req.params.id},nuevaTarea,{new:true});
        res.json({tarea});
    }catch(error){
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}

exports.eliminarTarea=async (req,res)=>{
    try{
        const {proyecto}=req.query;

        const tarea=await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg:"La Tarea no existe"});
        }
        const existeProyecto=await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg:"El proyecto no existe"});
        }

        if(existeProyecto.creador.toString()!==req.usuario.id){
            return res.status(401).json({msg:"No autorizado"});
        }

        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg:"Tarea eliminada"});
    }catch(error){
        console.log(error);
        return res.status(500).send("Hubo un error");
    }
}