const express= require('express');
const conectarDB=require('./config/db');
const cors=require('cors');

const app= express();
conectarDB();

app.use(cors());

app.use(express.json({extend:true}));

const port= process.env.port || 4000;

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));


app.listen(port,'0.0.0.0',()=>{
    console.log(`EL servidor esta en el puerto ${port}`);
})