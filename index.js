const express= require('express');
const conectarDB=require('./config/db');
const cors=require('cors');

const app= express();
conectarDB();

app.use(cors());

app.use(express.json({extend:true}));

const PORT= process.env.PORT || 4000;

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyectos'));
app.use('/api/tareas',require('./routes/tareas'));


app.listen(PORT,'0.0.0.0',()=>{
    console.log(`El servidor esta en el puerto ${PORT}`);
})